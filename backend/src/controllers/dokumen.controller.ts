import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Dokumen, type IDokumen } from "../models";
import type {
  CreateDokumenInput,
  DokumenListQuery,
  UpdateDokumenInput,
} from "../schemas/misc.schema";
import { isAdminUser } from "../utils/artikelMapper";
import { formatDokumen } from "../utils/dokumenMapper";
import { buildPaginationMeta, parsePagination } from "../utils/pagination";
import { sendSuccess } from "../utils/response";

function buildDokumenFilter(query: DokumenListQuery, isAdmin: boolean): FilterQuery<IDokumen> {
  const filter: FilterQuery<IDokumen> = {};

  if (!isAdmin) {
    filter.isPublished = true;
  }

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ name: regex }, { description: regex }];
  }

  if (query.category) {
    filter.category = query.category;
  }

  return filter;
}

export async function listDokumen(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as DokumenListQuery;
  const isAdmin = isAdminUser(req.user);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildDokumenFilter(query, isAdmin);

  const [items, total] = await Promise.all([
    Dokumen.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Dokumen.countDocuments(filter),
  ]);

  sendSuccess(res, items.map((item) => formatDokumen(item)), {
    pagination: buildPaginationMeta(page, limit, total),
  });
}

export async function createDokumen(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateDokumenInput;

  const dokumen = await Dokumen.create({
    name: data.name,
    fileUrl: data.fileUrl,
    fileSize: data.fileSize,
    fileType: data.fileType,
    category: data.category,
    description: data.description,
    isPublished: data.isPublished ?? false,
  });

  sendSuccess(res, formatDokumen(dokumen), {
    status: 201,
    message: "Dokumen berhasil dibuat",
  });
}

export async function updateDokumen(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateDokumenInput;
  const dokumen = await Dokumen.findById(req.params.id);

  if (!dokumen) {
    throw new AppError(404, "NOT_FOUND", "Dokumen tidak ditemukan");
  }

  if (data.name !== undefined) dokumen.name = data.name;
  if (data.fileUrl !== undefined) dokumen.fileUrl = data.fileUrl;
  if (data.fileSize !== undefined) dokumen.fileSize = data.fileSize;
  if (data.fileType !== undefined) dokumen.fileType = data.fileType;
  if (data.category !== undefined) dokumen.category = data.category;
  if (data.description !== undefined) dokumen.description = data.description;
  if (data.isPublished !== undefined) dokumen.isPublished = data.isPublished;

  await dokumen.save();

  sendSuccess(res, formatDokumen(dokumen), { message: "Dokumen berhasil diperbarui" });
}

export async function deleteDokumen(req: Request, res: Response): Promise<void> {
  const dokumen = await Dokumen.findByIdAndDelete(req.params.id);

  if (!dokumen) {
    throw new AppError(404, "NOT_FOUND", "Dokumen tidak ditemukan");
  }

  sendSuccess(res, { id: dokumen._id.toString() }, { message: "Dokumen berhasil dihapus" });
}
