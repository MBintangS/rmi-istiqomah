import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Program, type IProgram } from "@/server/models";
import type { CreateProgramInput, UpdateProgramInput } from "@/server/schemas/organisasi.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatProgram } from "@/server/utils/programMapper";

export async function listProgram(query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IProgram> = {};
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const items = await Program.find(filter).sort({ name: 1 });
  return items.map((item) => formatProgram(item));
}

export async function getProgramBySlug(slug: string, query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<IProgram> = { slug };
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const program = await Program.findOne(filter);
  if (!program) {
    throw new AppError(404, "NOT_FOUND", "Program tidak ditemukan");
  }
  return formatProgram(program, { includeContent: true });
}

export async function createProgram(data: CreateProgramInput) {
  const program = await Program.create({
    name: data.name,
    description: data.description,
    content: data.content,
    image: data.image || undefined,
    icon: data.icon,
    isActive: data.isActive ?? true,
  });
  return formatProgram(program, { includeContent: true });
}

export async function updateProgram(id: string, data: UpdateProgramInput) {
  const program = await Program.findById(id);
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
  return formatProgram(program, { includeContent: true });
}

export async function deleteProgram(id: string) {
  const program = await Program.findByIdAndDelete(id);
  if (!program) {
    throw new AppError(404, "NOT_FOUND", "Program tidak ditemukan");
  }
  return { id: program._id.toString() };
}
