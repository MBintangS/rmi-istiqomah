import type { FilterQuery } from "mongoose";
import { Types } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Galeri, type IGaleri, Kategori, Kegiatan } from "@/server/models";
import type { CreateGaleriInput, GaleriListQuery, UpdateGaleriInput } from "@/server/schemas/galeri.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatGaleri } from "@/server/utils/galeriMapper";
import { buildPaginationMeta, parsePagination } from "@/server/utils/pagination";

const GALERI_SORT_FIELDS = new Set(["createdAt", "updatedAt", "order", "title"]);

function parseGaleriSort(sort?: string) {
  if (!sort) {
    return { order: 1 as const, createdAt: -1 as const };
  }
  const field = sort.startsWith("-") ? sort.slice(1) : sort;
  if (!GALERI_SORT_FIELDS.has(field)) {
    return { order: 1 as const, createdAt: -1 as const };
  }
  return { [field]: sort.startsWith("-") ? (-1 as const) : (1 as const) };
}

function buildGaleriFilter(query: GaleriListQuery, includeUnpublished: boolean): FilterQuery<IGaleri> {
  const filter: FilterQuery<IGaleri> = {};
  if (!includeUnpublished) {
    filter.isPublished = true;
  }
  if (query.search) {
    filter.title = new RegExp(query.search, "i");
  }
  if (query.eventId && Types.ObjectId.isValid(query.eventId)) {
    filter.eventId = new Types.ObjectId(query.eventId);
  }
  return filter;
}

export async function listGaleri(query: GaleriListQuery, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildGaleriFilter(query, includeUnpublished);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "galeri" });
    if (!kategori) {
      return { data: [], pagination: buildPaginationMeta(page, limit, 0) };
    }
    filter.category = kategori._id;
  }

  const [items, total] = await Promise.all([
    Galeri.find(filter)
      .populate("category", "name slug")
      .populate("eventId", "title slug")
      .sort(parseGaleriSort(query.sort))
      .skip(skip)
      .limit(limit),
    Galeri.countDocuments(filter),
  ]);

  return {
    data: items.map((item) => formatGaleri(item)),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

export async function getGaleriById(id: string, query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IGaleri> = { _id: id };
  if (!includeUnpublished) {
    filter.isPublished = true;
  }
  const galeri = await Galeri.findOne(filter)
    .populate("category", "name slug")
    .populate("eventId", "title slug");
  if (!galeri) {
    throw new AppError(404, "NOT_FOUND", "Galeri tidak ditemukan");
  }
  return formatGaleri(galeri);
}

export async function createGaleri(data: CreateGaleriInput) {
  const kategori = await Kategori.findById(data.category);
  if (!kategori || kategori.type !== "galeri") {
    throw new AppError(400, "VALIDATION_ERROR", "Kategori galeri tidak valid");
  }
  if (data.eventId) {
    const kegiatan = await Kegiatan.findById(data.eventId);
    if (!kegiatan) {
      throw new AppError(400, "VALIDATION_ERROR", "Kegiatan terkait tidak valid");
    }
  }
  const galeri = await Galeri.create({
    title: data.title,
    images: data.images,
    videoUrl: data.videoUrl || undefined,
    category: data.category,
    eventId: data.eventId,
    order: data.order ?? 0,
    isPublished: data.isPublished ?? false,
  });
  await galeri.populate([
    { path: "category", select: "name slug" },
    { path: "eventId", select: "title slug" },
  ]);
  return formatGaleri(galeri);
}

export async function updateGaleri(id: string, data: UpdateGaleriInput) {
  const galeri = await Galeri.findById(id);
  if (!galeri) {
    throw new AppError(404, "NOT_FOUND", "Galeri tidak ditemukan");
  }
  if (data.category) {
    const kategori = await Kategori.findById(data.category);
    if (!kategori || kategori.type !== "galeri") {
      throw new AppError(400, "VALIDATION_ERROR", "Kategori galeri tidak valid");
    }
    galeri.category = kategori._id;
  }
  if (data.eventId) {
    const kegiatan = await Kegiatan.findById(data.eventId);
    if (!kegiatan) {
      throw new AppError(400, "VALIDATION_ERROR", "Kegiatan terkait tidak valid");
    }
    galeri.eventId = kegiatan._id;
  }
  if (data.title !== undefined) galeri.title = data.title;
  if (data.images !== undefined) galeri.images = data.images;
  if (data.videoUrl !== undefined) galeri.videoUrl = data.videoUrl || undefined;
  if (data.order !== undefined) galeri.order = data.order;
  if (data.isPublished !== undefined) galeri.isPublished = data.isPublished;
  await galeri.save();
  await galeri.populate([
    { path: "category", select: "name slug" },
    { path: "eventId", select: "title slug" },
  ]);
  return formatGaleri(galeri);
}

export async function deleteGaleri(id: string) {
  const galeri = await Galeri.findByIdAndDelete(id);
  if (!galeri) {
    throw new AppError(404, "NOT_FOUND", "Galeri tidak ditemukan");
  }
  return { id: galeri._id.toString() };
}
