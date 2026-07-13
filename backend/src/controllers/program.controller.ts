import type { Request, Response } from "express";
import type { FilterQuery } from "mongoose";
import { AppError } from "../middleware/errorHandler";
import { Program, type IProgram } from "../models";
import type { CreateProgramInput, UpdateProgramInput } from "../schemas/organisasi.schema";
import { canViewUnpublished } from "../utils/artikelMapper";
import { formatProgram } from "../utils/programMapper";
import { sendSuccess } from "../utils/response";

export async function listProgram(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<IProgram> = {};

  if (!includeUnpublished) {
    filter.isActive = true;
  }

  const items = await Program.find(filter).sort({ name: 1 });

  sendSuccess(res, items.map((item) => formatProgram(item)));
}

export async function getProgramBySlug(req: Request, res: Response): Promise<void> {
  const includeUnpublished = canViewUnpublished(req.user, req.query);
  const filter: FilterQuery<IProgram> = { slug: req.params.slug };

  if (!includeUnpublished) {
    filter.isActive = true;
  }

  const program = await Program.findOne(filter);

  if (!program) {
    throw new AppError(404, "NOT_FOUND", "Program tidak ditemukan");
  }

  sendSuccess(res, formatProgram(program, { includeContent: true }));
}

export async function createProgram(req: Request, res: Response): Promise<void> {
  const data = req.body as CreateProgramInput;

  const program = await Program.create({
    name: data.name,
    description: data.description,
    content: data.content,
    image: data.image || undefined,
    icon: data.icon,
    isActive: data.isActive ?? true,
  });

  sendSuccess(res, formatProgram(program, { includeContent: true }), {
    status: 201,
    message: "Program berhasil dibuat",
  });
}

export async function updateProgram(req: Request, res: Response): Promise<void> {
  const data = req.body as UpdateProgramInput;
  const program = await Program.findById(req.params.id);

  if (!program) {
    throw new AppError(404, "NOT_FOUND", "Program tidak ditemukan");
  }

  if (data.name !== undefined) program.name = data.name;
  if (data.description !== undefined) program.description = data.description;
  if (data.content !== undefined) program.content = data.content;
  if (data.image !== undefined) program.image = data.image || undefined;
  if (data.icon !== undefined) program.icon = data.icon;
  if (data.isActive !== undefined) program.isActive = data.isActive;

  await program.save();

  sendSuccess(res, formatProgram(program, { includeContent: true }), {
    message: "Program berhasil diperbarui",
  });
}

export async function deleteProgram(req: Request, res: Response): Promise<void> {
  const program = await Program.findByIdAndDelete(req.params.id);

  if (!program) {
    throw new AppError(404, "NOT_FOUND", "Program tidak ditemukan");
  }

  sendSuccess(res, { id: program._id.toString() }, { message: "Program berhasil dihapus" });
}
