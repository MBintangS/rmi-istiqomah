import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Pengurus, type IPengurus } from "../models";
import type { CreatePengurusInput, UpdatePengurusInput } from "../schemas/organisasi.schema";
import { isAdminUser } from "../utils/artikelMapper";
import { formatPengurus } from "../utils/pengurusMapper";
import { sendSuccess } from "../utils/response";

export async function listPengurus(req: Request, res: Response): Promise<void> {
  const isAdmin = isAdminUser(req.user);
  const filter: FilterQuery<IPengurus> = {};

  if (!isAdmin) {
    filter.isActive = true;
  }

  const items = await Pengurus.find(filter).sort({ order: 1, createdAt: -1 });

  sendSuccess(res, items.map((item) => formatPengurus(item)));
}

export async function createPengurus(req: Request, res: Response): Promise<void> {
  const data = req.body as CreatePengurusInput;

  const pengurus = await Pengurus.create({
    name: data.name,
    position: data.position,
    photo: data.photo || undefined,
    period: data.period,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });

  sendSuccess(res, formatPengurus(pengurus), {
    status: 201,
    message: "Pengurus berhasil dibuat",
  });
}

export async function updatePengurus(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdatePengurusInput;
  const pengurus = await Pengurus.findById(req.params.id);

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

  sendSuccess(res, formatPengurus(pengurus), { message: "Pengurus berhasil diperbarui" });
}

export async function deletePengurus(req: Request, res: Response): Promise<void> {
  const pengurus = await Pengurus.findByIdAndDelete(req.params.id);

  if (!pengurus) {
    throw new AppError(404, "NOT_FOUND", "Pengurus tidak ditemukan");
  }

  sendSuccess(res, { id: pengurus._id.toString() }, { message: "Pengurus berhasil dihapus" });
}
