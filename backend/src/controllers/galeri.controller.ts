import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { Types } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Galeri, type IGaleri, Kategori, Kegiatan } from "../models";
import type {
  CreateGaleriInput,
  GaleriListQuery,
  UpdateGaleriInput,
} from "../schemas/galeri.schema";
import { isAdminUser } from "../utils/artikelMapper";
import { formatGaleri } from "../utils/galeriMapper";
import { buildPaginationMeta, parsePagination } from "../utils/pagination";
import { sendSuccess } from "../utils/response";

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

function buildGaleriFilter(query: GaleriListQuery, isAdmin: boolean): FilterQuery<IGaleri> {
  const filter: FilterQuery<IGaleri> = {};

  if (!isAdmin) {
    filter.isPublished = true;
  }

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.title = regex;
  }

  if (query.eventId && Types.ObjectId.isValid(query.eventId)) {
    filter.eventId = new Types.ObjectId(query.eventId);
  }

  return filter;
}

export async function listGaleri(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as GaleriListQuery;
  const isAdmin = isAdminUser(req.user);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildGaleriFilter(query, isAdmin);

  if (query.category) {
    const kategori = await Kategori.findOne({ slug: query.category, type: "galeri" });

    if (!kategori) {
      sendSuccess(res, [], { pagination: buildPaginationMeta(page, limit, 0) });
      return;
    }

    filter.category = kategori._id;
  }

  const sort = parseGaleriSort(query.sort);

  const [items, total] = await Promise.all([
    Galeri.find(filter)
      .populate("category", "name slug")
      .populate("eventId", "title slug")
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Galeri.countDocuments(filter),
  ]);

  sendSuccess(res, items.map((item) => formatGaleri(item)), {
    pagination: buildPaginationMeta(page, limit, total),
  });
}

export async function getGaleriById(req: Request, res: Response): Promise<void> {
  const isAdmin = isAdminUser(req.user);
  const filter: FilterQuery<IGaleri> = { _id: req.params.id };

  if (!isAdmin) {
    filter.isPublished = true;
  }

  const galeri = await Galeri.findOne(filter)
    .populate("category", "name slug")
    .populate("eventId", "title slug");

  if (!galeri) {
    throw new AppError(404, "NOT_FOUND", "Galeri tidak ditemukan");
  }

  sendSuccess(res, formatGaleri(galeri));
}

export async function createGaleri(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateGaleriInput;

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

  sendSuccess(res, formatGaleri(galeri), {
    status: 201,
    message: "Galeri berhasil dibuat",
  });
}

export async function updateGaleri(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateGaleriInput;
  const galeri = await Galeri.findById(req.params.id);

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

  sendSuccess(res, formatGaleri(galeri), { message: "Galeri berhasil diperbarui" });
}

export async function deleteGaleri(req: Request, res: Response): Promise<void> {
  const galeri = await Galeri.findByIdAndDelete(req.params.id);

  if (!galeri) {
    throw new AppError(404, "NOT_FOUND", "Galeri tidak ditemukan");
  }

  sendSuccess(res, { id: galeri._id.toString() }, { message: "Galeri berhasil dihapus" });
}
