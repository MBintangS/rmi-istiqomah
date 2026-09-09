import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Kegiatan, type IKegiatan, Kategori } from "@/server/models";
import type {
  CreateKegiatanInput,
  KegiatanListQuery,
  UpdateKegiatanInput,
} from "@/server/schemas/kegiatan.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatKegiatan } from "@/server/utils/kegiatanMapper";
import { buildPaginationMeta, parsePagination } from "@/server/utils/pagination";

const KEGIATAN_SORT_FIELDS = new Set(["createdAt", "updatedAt", "dateStart", "title"]);

function parseKegiatanSort(sort?: string) {
  if (!sort) {
    return { dateStart: -1 as const };
  }
  const field = sort.startsWith("-") ? sort.slice(1) : sort;
  if (!KEGIATAN_SORT_FIELDS.has(field)) {
    return { dateStart: -1 as const };
  }
  return { [field]: sort.startsWith("-") ? (-1 as const) : (1 as const) };
}

function buildKegiatanFilter(query: KegiatanListQuery, includeUnpublished: boolean): FilterQuery<IKegiatan> {
  const filter: FilterQuery<IKegiatan> = {};
  if (!includeUnpublished) {
    filter.isPublished = true;
  }
  if (query.status) {
    filter.status = query.status;
  }
  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }
  return filter;
}

export async function listKegiatan(query: KegiatanListQuery, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildKegiatanFilter(query, includeUnpublished);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "kegiatan" });
    if (!kategori) {
      return { data: [], pagination: buildPaginationMeta(page, limit, 0) };
    }
    filter.category = kategori._id;
  }

  const [items, total] = await Promise.all([
    Kegiatan.find(filter).populate("category", "name slug").sort(parseKegiatanSort(query.sort)).skip(skip).limit(limit),
    Kegiatan.countDocuments(filter),
  ]);

  return {
    data: items.map((item) => formatKegiatan(item)),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

export async function getKegiatanBySlug(slug: string, query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IKegiatan> = { slug };
  if (!includeUnpublished) {
    filter.isPublished = true;
  }
  const kegiatan = await Kegiatan.findOne(filter).populate("category", "name slug");
  if (!kegiatan) {
    throw new AppError(404, "NOT_FOUND", "Kegiatan tidak ditemukan");
  }
  return formatKegiatan(kegiatan);
}

export async function createKegiatan(data: CreateKegiatanInput) {
  const kategori = await Kategori.findById(data.category);
  if (!kategori || kategori.type !== "kegiatan") {
    throw new AppError(400, "VALIDATION_ERROR", "Kategori kegiatan tidak valid");
  }

  const kegiatan = await Kegiatan.create({
    title: data.title,
    description: data.description,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    time: data.time,
    location: data.location,
    locationMap: data.locationMap || undefined,
    category: data.category,
    thumbnail: data.thumbnail || undefined,
    status: data.status ?? "upcoming",
    isPublished: data.isPublished ?? false,
  });
  await kegiatan.populate("category", "name slug");
  return formatKegiatan(kegiatan);
}

export async function updateKegiatan(id: string, data: UpdateKegiatanInput) {
  const kegiatan = await Kegiatan.findById(id);
  if (!kegiatan) {
    throw new AppError(404, "NOT_FOUND", "Kegiatan tidak ditemukan");
  }
  if (data.category) {
    const kategori = await Kategori.findById(data.category);
    if (!kategori || kategori.type !== "kegiatan") {
      throw new AppError(400, "VALIDATION_ERROR", "Kategori kegiatan tidak valid");
    }
    kegiatan.category = kategori._id;
  }
  if (data.title !== undefined) kegiatan.title = data.title;
  if (data.description !== undefined) kegiatan.description = data.description;
  if (data.dateStart !== undefined) kegiatan.dateStart = data.dateStart;
  if (data.dateEnd !== undefined) kegiatan.dateEnd = data.dateEnd ?? undefined;
  if (data.time !== undefined) kegiatan.time = data.time;
  if (data.location !== undefined) kegiatan.location = data.location;
  if (data.locationMap !== undefined) kegiatan.locationMap = data.locationMap || undefined;
  if (data.thumbnail !== undefined) kegiatan.thumbnail = data.thumbnail || undefined;
  if (data.status !== undefined) kegiatan.status = data.status;
  if (data.isPublished !== undefined) kegiatan.isPublished = data.isPublished;
  await kegiatan.save();
  await kegiatan.populate("category", "name slug");
  return formatKegiatan(kegiatan);
}

export async function deleteKegiatan(id: string) {
  const kegiatan = await Kegiatan.findByIdAndDelete(id);
  if (!kegiatan) {
    throw new AppError(404, "NOT_FOUND", "Kegiatan tidak ditemukan");
  }
  return { id: kegiatan._id.toString() };
}
