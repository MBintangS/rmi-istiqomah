import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Testimoni, type ITestimoni } from "../models";
import type { CreateTestimoniInput, UpdateTestimoniInput } from "../schemas/organisasi.schema";
import { canViewUnpublished } from "../utils/artikelMapper";
import { formatTestimoni } from "../utils/testimoniMapper";
import { sendSuccess } from "../utils/response";

export async function listTestimoni(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<ITestimoni> = {};

  if (!includeUnpublished) {
    filter.isActive = true;
  }

  const items = await Testimoni.find(filter).sort({ order: 1, createdAt: -1 });

  sendSuccess(res, items.map((item) => formatTestimoni(item)));
}

export async function createTestimoni(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateTestimoniInput;

  const testimoni = await Testimoni.create({
    name: data.name,
    content: data.content,
    role: data.role,
    photo: data.photo || undefined,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });

  sendSuccess(res, formatTestimoni(testimoni), {
    status: 201,
    message: "Testimoni berhasil dibuat",
  });
}

export async function updateTestimoni(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateTestimoniInput;
  const testimoni = await Testimoni.findById(req.params.id);

  if (!testimoni) {
    throw new AppError(404, "NOT_FOUND", "Testimoni tidak ditemukan");
  }

  if (data.name !== undefined) testimoni.name = data.name;
  if (data.content !== undefined) testimoni.content = data.content;
  if (data.role !== undefined) testimoni.role = data.role;
  if (data.photo !== undefined) testimoni.photo = data.photo || undefined;
  if (data.order !== undefined) testimoni.order = data.order;
  if (data.isActive !== undefined) testimoni.isActive = data.isActive;

  await testimoni.save();

  sendSuccess(res, formatTestimoni(testimoni), { message: "Testimoni berhasil diperbarui" });
}

export async function deleteTestimoni(req: Request, res: Response): Promise<void> {
  const testimoni = await Testimoni.findByIdAndDelete(req.params.id);

  if (!testimoni) {
    throw new AppError(404, "NOT_FOUND", "Testimoni tidak ditemukan");
  }

  sendSuccess(res, { id: testimoni._id.toString() }, { message: "Testimoni berhasil dihapus" });
}
