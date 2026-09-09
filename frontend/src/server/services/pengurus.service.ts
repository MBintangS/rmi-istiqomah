import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Pengurus, type IPengurus } from "@/server/models";
import type { CreatePengurusInput, UpdatePengurusInput } from "@/server/schemas/organisasi.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatPengurus } from "@/server/utils/pengurusMapper";

export async function listPengurus(query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IPengurus> = {};
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const items = await Pengurus.find(filter).sort({ order: 1, createdAt: -1 });
  return items.map((item) => formatPengurus(item));
}

export async function createPengurus(data: CreatePengurusInput) {
  const pengurus = await Pengurus.create({
    name: data.name,
    position: data.position,
    photo: data.photo || undefined,
    period: data.period,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });
  return formatPengurus(pengurus);
}

export async function updatePengurus(id: string, data: UpdatePengurusInput) {
  const pengurus = await Pengurus.findById(id);
  if (!pengurus) {
    throw new AppError(404, "NOT_FOUND", "Pengurus tidak ditemukan");
  }
  if (data.name !== undefined) pengurus.name = data.name;
  if (data.position !== undefined) pengurus.position = data.position;
  if (data.photo !== undefined) pengurus.photo = data.photo || undefined;
  if (data.period !== undefined) pengurus.period = data.period;
  if (data.order !== undefined) pengurus.order = data.order;
  if (data.isActive !== undefined) pengurus.isActive = data.isActive;
  await pengurus.save();
  return formatPengurus(pengurus);
}

export async function deletePengurus(id: string) {
  const pengurus = await Pengurus.findByIdAndDelete(id);
  if (!pengurus) {
    throw new AppError(404, "NOT_FOUND", "Pengurus tidak ditemukan");
  }
  return { id: pengurus._id.toString() };
}
