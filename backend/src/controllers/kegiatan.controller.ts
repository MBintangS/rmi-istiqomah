import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Kegiatan, type IKegiatan, Kategori } from "../models";
import type {
  CreateKegiatanInput,
  KegiatanListQuery,
  UpdateKegiatanInput,
} from "../schemas/kegiatan.schema";
import { isAdminUser } from "../utils/artikelMapper";
import { formatKegiatan } from "../utils/kegiatanMapper";
import { buildPaginationMeta, parsePagination } from "../utils/pagination";
import { sendSuccess } from "../utils/response";

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

function buildKegiatanFilter(query: KegiatanListQuery, isAdmin: boolean): FilterQuery<IKegiatan> {
  const filter: FilterQuery<IKegiatan> = {};

  if (!isAdmin) {
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

export async function listKegiatan(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as KegiatanListQuery;
  const isAdmin = isAdminUser(req.user);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildKegiatanFilter(query, isAdmin);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "kegiatan" });

    if (!kategori) {
      sendSuccess(res, [], { pagination: buildPaginationMeta(page, limit, 0) });
      return;
    }

    filter.category = kategori._id;
  }

  const sort = parseKegiatanSort(query.sort);

  const [items, total] = await Promise.all([
    Kegiatan.find(filter).populate("category", "name slug").sort(sort).skip(skip).limit(limit),
    Kegiatan.countDocuments(filter),
  ]);

  sendSuccess(res, items.map((item) => formatKegiatan(item)), {
    pagination: buildPaginationMeta(page, limit, total),
  });
}

export async function getKegiatanBySlug(req: Request, res: Response): Promise<void> {
  const isAdmin = isAdminUser(req.user);
  const filter: FilterQuery<IKegiatan> = { slug: req.params.slug };

  if (!isAdmin) {
    filter.isPublished = true;
  }

  const kegiatan = await Kegiatan.findOne(filter).populate("category", "name slug");

  if (!kegiatan) {
    throw new AppError(404, "NOT_FOUND", "Kegiatan tidak ditemukan");
  }

  sendSuccess(res, formatKegiatan(kegiatan));
}

export async function createKegiatan(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateKegiatanInput;

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

  sendSuccess(res, formatKegiatan(kegiatan), {
    status: 201,
    message: "Kegiatan berhasil dibuat",
  });
}

export async function updateKegiatan(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateKegiatanInput;
  const kegiatan = await Kegiatan.findById(req.params.id);

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

  sendSuccess(res, formatKegiatan(kegiatan), { message: "Kegiatan berhasil diperbarui" });
}

export async function deleteKegiatan(req: Request, res: Response): Promise<void> {
  const kegiatan = await Kegiatan.findByIdAndDelete(req.params.id);

  if (!kegiatan) {
    throw new AppError(404, "NOT_FOUND", "Kegiatan tidak ditemukan");
  }

  sendSuccess(res, { id: kegiatan._id.toString() }, { message: "Kegiatan berhasil dihapus" });
}
