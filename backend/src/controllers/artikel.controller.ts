import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Artikel, type IArtikel, Kategori } from "../models";
import type {
  ArtikelListQuery,
  CreateArtikelInput,
  UpdateArtikelInput,
} from "../schemas/artikel.schema";
import { formatArtikel, canViewUnpublished } from "../utils/artikelMapper";
import { buildPaginationMeta, parsePagination, parseSort } from "../utils/pagination";
import { sendSuccess } from "../utils/response";

function buildArtikelFilter(
  query: ArtikelListQuery,
  includeUnpublished: boolean,
): FilterQuery<IArtikel> {
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

export async function listArtikel(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as ArtikelListQuery;
  const includeUnpublished = canViewUnpublished(req.user, query);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildArtikelFilter(query, includeUnpublished);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "artikel" });

    if (!kategori) {
      sendSuccess(res, [], { pagination: buildPaginationMeta(page, limit, 0) });
      return;
    }

    filter.category = kategori._id;
  }

  const sort = parseSort(query.sort);

  const [items, total] = await Promise.all([
    Artikel.find(filter)
      .populate("category", "name slug")
      .populate("author", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Artikel.countDocuments(filter),
  ]);

  sendSuccess(res, items.map((item) => formatArtikel(item)), {
    pagination: buildPaginationMeta(page, limit, total),
  });
}

export async function getArtikelBySlug(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<IArtikel> = { slug: req.params.slug };

  if (!includeUnpublished) {
    filter.status = "published";
  }

  const artikel = await Artikel.findOne(filter)
    .populate("category", "name slug")
    .populate("author", "name");

  if (!artikel) {
    throw new AppError(404, "NOT_FOUND", "Artikel tidak ditemukan");
  }

  sendSuccess(res, formatArtikel(artikel, { includeContent: true }));
}

export async function createArtikel(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const data = req.body as CreateArtikelInput;

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
    author: req.user.id,
  });

  await artikel.populate([
    { path: "category", select: "name slug" },
    { path: "author", select: "name" },
  ]);

  sendSuccess(res, formatArtikel(artikel, { includeContent: true }), {
    status: 201,
    message: "Artikel berhasil dibuat",
  });
}

export async function updateArtikel(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateArtikelInput;
  const artikel = await Artikel.findById(req.params.id);

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

  sendSuccess(res, formatArtikel(artikel, { includeContent: true }), {
    message: "Artikel berhasil diperbarui",
  });
}

export async function deleteArtikel(req: Request, res: Response): Promise<void> {
  const artikel = await Artikel.findByIdAndDelete(req.params.id);

  if (!artikel) {
    throw new AppError(404, "NOT_FOUND", "Artikel tidak ditemukan");
  }

  sendSuccess(res, { id: artikel._id.toString() }, { message: "Artikel berhasil dihapus" });
}
