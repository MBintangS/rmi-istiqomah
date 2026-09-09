import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Artikel, type IArtikel, Kategori } from "@/server/models";
import type {
  ArtikelListQuery,
  CreateArtikelInput,
  UpdateArtikelInput,
} from "@/server/schemas/artikel.schema";
import { canViewUnpublished, formatArtikel } from "@/server/utils/artikelMapper";
import { buildPaginationMeta, parsePagination, parseSort } from "@/server/utils/pagination";

function buildArtikelFilter(query: ArtikelListQuery, includeUnpublished: boolean): FilterQuery<IArtikel> {
  const filter: FilterQuery<IArtikel> = {};

  if (includeUnpublished && query.status) {
    filter.status = query.status;
  } else if (!includeUnpublished) {
    filter.status = "published";
  }

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ title: regex }, { excerpt: regex }];
  }

  return filter;
}

export async function listArtikel(query: ArtikelListQuery, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildArtikelFilter(query, includeUnpublished);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "artikel" });
    if (!kategori) {
      return { data: [], pagination: buildPaginationMeta(page, limit, 0) };
    }
    filter.category = kategori._id;
  }

  const [items, total] = await Promise.all([
    Artikel.find(filter)
      .populate("category", "name slug")
      .populate("author", "name")
      .sort(parseSort(query.sort))
      .skip(skip)
      .limit(limit),
    Artikel.countDocuments(filter),
  ]);

  return {
    data: items.map((item) => formatArtikel(item)),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

export async function getArtikelBySlug(slug: string, query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IArtikel> = { slug };
  if (!includeUnpublished) {
    filter.status = "published";
  }

  const artikel = await Artikel.findOne(filter)
    .populate("category", "name slug")
    .populate("author", "name");

  if (!artikel) {
    throw new AppError(404, "NOT_FOUND", "Artikel tidak ditemukan");
  }

  return formatArtikel(artikel, { includeContent: true });
}

export async function createArtikel(data: CreateArtikelInput, user: AuthUser) {
  const kategori = await Kategori.findById(data.category);
  if (!kategori || kategori.type !== "artikel") {
    throw new AppError(400, "VALIDATION_ERROR", "Kategori artikel tidak valid");
  }

  const artikel = await Artikel.create({
    title: data.title,
    content: data.content,
    category: data.category,
    thumbnail: data.thumbnail || undefined,
    status: data.status ?? "draft",
    excerpt: data.excerpt,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    author: user.id,
  });

  await artikel.populate([
    { path: "category", select: "name slug" },
    { path: "author", select: "name" },
  ]);

  return formatArtikel(artikel, { includeContent: true });
}

export async function updateArtikel(id: string, data: UpdateArtikelInput) {
  const artikel = await Artikel.findById(id);
  if (!artikel) {
    throw new AppError(404, "NOT_FOUND", "Artikel tidak ditemukan");
  }

  if (data.category) {
    const kategori = await Kategori.findById(data.category);
    if (!kategori || kategori.type !== "artikel") {
      throw new AppError(400, "VALIDATION_ERROR", "Kategori artikel tidak valid");
    }
    artikel.category = kategori._id;
  }

  if (data.title !== undefined) artikel.title = data.title;
  if (data.content !== undefined) artikel.content = data.content;
  if (data.thumbnail !== undefined) artikel.thumbnail = data.thumbnail || undefined;
  if (data.status !== undefined) artikel.status = data.status;
  if (data.excerpt !== undefined) artikel.excerpt = data.excerpt;
  if (data.metaTitle !== undefined) artikel.metaTitle = data.metaTitle;
  if (data.metaDescription !== undefined) artikel.metaDescription = data.metaDescription;

  await artikel.save();
  await artikel.populate([
    { path: "category", select: "name slug" },
    { path: "author", select: "name" },
  ]);

  return formatArtikel(artikel, { includeContent: true });
}

export async function deleteArtikel(id: string) {
  const artikel = await Artikel.findByIdAndDelete(id);
  if (!artikel) {
    throw new AppError(404, "NOT_FOUND", "Artikel tidak ditemukan");
  }
  return { id: artikel._id.toString() };
}
