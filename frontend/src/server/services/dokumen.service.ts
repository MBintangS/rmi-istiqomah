import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Dokumen, type IDokumen } from "@/server/models";
import type { CreateDokumenInput, DokumenListQuery, UpdateDokumenInput } from "@/server/schemas/misc.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatDokumen } from "@/server/utils/dokumenMapper";
import { buildPaginationMeta, parsePagination } from "@/server/utils/pagination";

function buildDokumenFilter(query: DokumenListQuery, includeUnpublished: boolean): FilterQuery<IDokumen> {
  const filter: FilterQuery<IDokumen> = {};
  if (!includeUnpublished) {
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

export async function listDokumen(query: DokumenListQuery, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const { page, limit, skip } = parsePagination(query);
  const filter = buildDokumenFilter(query, includeUnpublished);
  const [items, total] = await Promise.all([
    Dokumen.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Dokumen.countDocuments(filter),
  ]);
  return {
    data: items.map((item) => formatDokumen(item)),
    pagination: buildPaginationMeta(page, limit, total),
  };
}

export async function createDokumen(data: CreateDokumenInput) {
  const dokumen = await Dokumen.create({
    name: data.name,
    fileUrl: data.fileUrl,
    fileSize: data.fileSize,
    fileType: data.fileType,
    category: data.category,
    description: data.description,
    isPublished: data.isPublished ?? false,
  });
  return formatDokumen(dokumen);
}

export async function updateDokumen(id: string, data: UpdateDokumenInput) {
  const dokumen = await Dokumen.findById(id);
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
  return formatDokumen(dokumen);
}

export async function deleteDokumen(id: string) {
  const dokumen = await Dokumen.findByIdAndDelete(id);
  if (!dokumen) {
    throw new AppError(404, "NOT_FOUND", "Dokumen tidak ditemukan");
  }
  return { id: dokumen._id.toString() };
}
