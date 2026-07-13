import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Donasi, type IDonasi } from "../models";
import type { CreateDonasiInput, UpdateDonasiInput } from "../schemas/donasi.schema";
import { canViewUnpublished } from "../utils/artikelMapper";
import { formatDonasi } from "../utils/donasiMapper";
import { sendSuccess } from "../utils/response";

export async function listDonasi(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<IDonasi> = {};

  if (!includeUnpublished) {
    filter.isActive = true;
  }

  const items = await Donasi.find(filter).sort({ order: 1, createdAt: -1 });

  sendSuccess(res, items.map((item) => formatDonasi(item)));
}

export async function getDonasiById(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<IDonasi> = { _id: req.params.id };

  if (!includeUnpublished) {
    filter.isActive = true;
  }

  const donasi = await Donasi.findOne(filter);

  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }

  sendSuccess(res, formatDonasi(donasi));
}

export async function createDonasi(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateDonasiInput;

  const donasi = await Donasi.create({
    bank: data.bank,
    accountNumber: data.accountNumber,
    accountName: data.accountName,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });

  sendSuccess(res, formatDonasi(donasi), {
    status: 201,
    message: "Rekening donasi berhasil dibuat",
  });
}

export async function updateDonasi(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateDonasiInput;
  const donasi = await Donasi.findById(req.params.id);

  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }

  if (data.bank !== undefined) donasi.bank = data.bank;
  if (data.accountNumber !== undefined) donasi.accountNumber = data.accountNumber;
  if (data.accountName !== undefined) donasi.accountName = data.accountName;
  if (data.order !== undefined) donasi.order = data.order;
  if (data.isActive !== undefined) donasi.isActive = data.isActive;

  await donasi.save();

  sendSuccess(res, formatDonasi(donasi), { message: "Rekening donasi berhasil diperbarui" });
}

export async function deleteDonasi(req: Request, res: Response): Promise<void> {
  const donasi = await Donasi.findByIdAndDelete(req.params.id);

  if (!donasi) {
    throw new AppError(404, "NOT_FOUND", "Rekening donasi tidak ditemukan");
  }

  sendSuccess(res, { id: donasi._id.toString() }, { message: "Rekening donasi berhasil dihapus" });
}
