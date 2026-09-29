import type { FilterQuery, Types } from "mongoose";
import { AppError } from "@/server/errors";
import { Pendaftaran, Peserta, Program, type IPendaftaran } from "@/server/models";
import type {
  CreatePendaftaranInput,
  PendaftaranListQuery,
  SubmitPesertaInput,
  UpdatePendaftaranInput,
} from "@/server/schemas/pendaftaran.schema";
import {
  formatPendaftaran,
  formatPeserta,
  normalizeWhatsapp,
  resolvePendaftaranStatus,
} from "@/server/utils/pendaftaranMapper";

function assertDateOrder(opensAt: Date, closesAt: Date) {
  if (closesAt.getTime() <= opensAt.getTime()) {
    throw new AppError(400, "VALIDATION_ERROR", "Tanggal tutup harus setelah tanggal buka");
  }
}

let droppedWhatsappUniqueIndex: Promise<void> | null = null;

function allowRepeatedWhatsapp() {
  droppedWhatsappUniqueIndex ??= Peserta.collection
    .dropIndex("pendaftaran_1_whatsapp_1")
    .then(() => undefined)
    .catch((error: { code?: number; codeName?: string }) => {
      if (error.code === 27 || error.codeName === "IndexNotFound") return;
      droppedWhatsappUniqueIndex = null;
      throw error;
    });
  return droppedWhatsappUniqueIndex;
}

async function requireActiveProgram(programId: string) {
  const program = await Program.findById(programId);
  if (!program || !program.isActive) {
    throw new AppError(400, "VALIDATION_ERROR", "Program tidak ditemukan atau tidak aktif");
  }
  return program;
}

async function pesertaCounts(ids: Types.ObjectId[]) {
  if (ids.length === 0) return new Map<string, number>();
  const rows = await Peserta.aggregate<{ _id: Types.ObjectId; count: number }>([
    { $match: { pendaftaran: { $in: ids } } },
    { $group: { _id: "$pendaftaran", count: { $sum: 1 } } },
  ]);
  return new Map(rows.map((row) => [row._id.toString(), row.count]));
}

function openFilter(now = new Date()): FilterQuery<IPendaftaran> {
  return {
    isPublished: true,
    opensAt: { $lte: now },
    closesAt: { $gte: now },
  };
}

export async function listOpenPendaftaran(query: PendaftaranListQuery) {
  const filter = openFilter();

  if (query.program) {
    const program = await Program.findOne({ slug: query.program, isActive: true }).select("_id");
    if (!program) return [];
    filter.program = program._id;
  }

  const items = await Pendaftaran.find(filter).populate("program", "name slug").sort({ opensAt: 1 });
  return items.map((item) => formatPendaftaran(item));
}

export async function getOpenPendaftaranBySlug(slug: string) {
  const item = await Pendaftaran.findOne({ slug }).populate("program", "name slug");
  if (!item || resolvePendaftaranStatus(item) !== "open") {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }
  return formatPendaftaran(item);
}

export async function submitPeserta(slug: string, data: SubmitPesertaInput) {
  const item = await Pendaftaran.findOne({ slug });
  if (!item || resolvePendaftaranStatus(item) !== "open") {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }

  const whatsapp = normalizeWhatsapp(data.whatsapp);
  if (whatsapp.length < 8) {
    throw new AppError(400, "VALIDATION_ERROR", "Nomor WhatsApp tidak valid");
  }

  await allowRepeatedWhatsapp();

  const peserta = await Peserta.create({
    pendaftaran: item._id,
    name: data.name,
    whatsapp,
    email: data.email || null,
    notes: data.notes || null,
    age: data.age,
    address: data.address,
  });

  return {
    id: peserta._id.toString(),
    name: peserta.name,
    whatsapp: peserta.whatsapp,
    age: peserta.age,
    address: peserta.address,
    email: peserta.email || null,
    createdAt: peserta.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

export async function listAdminPendaftaran() {
  const items = await Pendaftaran.find().populate("program", "name slug").sort({ opensAt: -1 });
  const counts = await pesertaCounts(items.map((item) => item._id));
  return items.map((item) => formatPendaftaran(item, { pesertaCount: counts.get(item._id.toString()) ?? 0 }));
}

export async function getAdminPendaftaran(id: string) {
  const item = await Pendaftaran.findById(id).populate("program", "name slug");
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }
  const count = await Peserta.countDocuments({ pendaftaran: item._id });
  return formatPendaftaran(item, { pesertaCount: count });
}

export async function createPendaftaran(data: CreatePendaftaranInput) {
  await requireActiveProgram(data.programId);
  assertDateOrder(data.opensAt, data.closesAt);

  const item = await Pendaftaran.create({
    title: data.title,
    description: data.description || undefined,
    program: data.programId,
    opensAt: data.opensAt,
    closesAt: data.closesAt,
    isPublished: data.isPublished ?? false,
  });

  await item.populate("program", "name slug");
  return formatPendaftaran(item, { pesertaCount: 0 });
}

export async function updatePendaftaran(id: string, data: UpdatePendaftaranInput) {
  const item = await Pendaftaran.findById(id);
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }

  if (data.programId !== undefined) {
    await requireActiveProgram(data.programId);
    item.program = data.programId as unknown as typeof item.program;
  }
  if (data.title !== undefined) item.title = data.title;
  if (data.description !== undefined) item.description = data.description || undefined;
  if (data.opensAt !== undefined) item.opensAt = data.opensAt;
  if (data.closesAt !== undefined) item.closesAt = data.closesAt;
  if (data.isPublished !== undefined) item.isPublished = data.isPublished;

  assertDateOrder(item.opensAt, item.closesAt);
  await item.save();
  await item.populate("program", "name slug");
  const count = await Peserta.countDocuments({ pendaftaran: item._id });
  return formatPendaftaran(item, { pesertaCount: count });
}

export async function deletePendaftaran(id: string) {
  const item = await Pendaftaran.findByIdAndDelete(id);
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }
  await Peserta.deleteMany({ pendaftaran: item._id });
  return { id: item._id.toString() };
}

export async function listPeserta(id: string) {
  const item = await Pendaftaran.findById(id).select("_id");
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Pendaftaran tidak ditemukan");
  }
  const rows = await Peserta.find({ pendaftaran: item._id }).sort({ createdAt: -1 });
  return rows.map((row) => formatPeserta(row));
}
