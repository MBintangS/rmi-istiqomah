import type { Types } from "mongoose";
import type { IDokumen } from "../models/Dokumen.model";

type DokumenLike = IDokumen & { _id: Types.ObjectId };

export function formatDokumen(dokumen: DokumenLike) {
  return {
    id: dokumen._id.toString(),
    name: dokumen.name,
    fileUrl: dokumen.fileUrl,
    fileSize: dokumen.fileSize ?? null,
    fileType: dokumen.fileType ?? null,
    category: dokumen.category ?? null,
    description: dokumen.description ?? null,
    isPublished: dokumen.isPublished,
    createdAt: dokumen.createdAt,
    updatedAt: dokumen.updatedAt,
  };
}
