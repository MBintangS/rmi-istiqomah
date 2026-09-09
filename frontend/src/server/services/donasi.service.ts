import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Donasi, type IDonasi } from "@/server/models";
import type { CreateDonasiInput, UpdateDonasiInput } from "@/server/schemas/donasi.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatDonasi } from "@/server/utils/donasiMapper";

export async function listDonasi(query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IDonasi> = {};
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const items = await Donasi.find(filter).sort({ order: 1, createdAt: -1 });
  return items.map((item) => formatDonasi(item));
}

export async function getDonasiById(id: string, query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IDonasi> = { _id: id };
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const donasi = await Donasi.findOne(filter);
  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }
  return formatDonasi(donasi);
}

export async function createDonasi(data: CreateDonasiInput) {
  const donasi = await Donasi.create({
    bank: data.bank,
    accountNumber: data.accountNumber,
    accountName: data.accountName,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });
  return formatDonasi(donasi);
}

export async function updateDonasi(id: string, data: UpdateDonasiInput) {
  const donasi = await Donasi.findById(id);
  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }
  if (data.bank !== undefined) donasi.bank = data.bank;
  if (data.accountNumber !== undefined) donasi.accountNumber = data.accountNumber;
  if (data.accountName !== undefined) donasi.accountName = data.accountName;
  if (data.order !== undefined) donasi.order = data.order;
  if (data.isActive !== undefined) donasi.isActive = data.isActive;
  await donasi.save();
  return formatDonasi(donasi);
}

export async function deleteDonasi(id: string) {
  const donasi = await Donasi.findByIdAndDelete(id);
  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }
  return { id: donasi._id.toString() };
}
