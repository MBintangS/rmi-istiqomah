import type { FilterQuery } from "mongoose";
import type { AuthUser } from "@/server/auth";
import { AppError } from "@/server/errors";
import { Testimoni, type ITestimoni } from "@/server/models";
import type { CreateTestimoniInput, UpdateTestimoniInput } from "@/server/schemas/organisasi.schema";
import { canViewUnpublished } from "@/server/utils/artikelMapper";
import { formatTestimoni } from "@/server/utils/testimoniMapper";

export async function listTestimoni(query: Record<string, unknown>, user?: AuthUser) {
  const includeUnpublished = canViewUnpublished(user, query);
  const filter: FilterQuery<ITestimoni> = {};
  if (!includeUnpublished) {
    filter.isActive = true;
  }
  const items = await Testimoni.find(filter).sort({ order: 1, createdAt: -1 });
  return items.map((item) => formatTestimoni(item));
}

export async function createTestimoni(data: CreateTestimoniInput) {
  const testimoni = await Testimoni.create({
    name: data.name,
    content: data.content,
    role: data.role,
    photo: data.photo || undefined,
    order: data.order ?? 0,
    isActive: data.isActive ?? true,
  });
  return formatTestimoni(testimoni);
}

export async function updateTestimoni(id: string, data: UpdateTestimoniInput) {
  const testimoni = await Testimoni.findById(id);
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
  return formatTestimoni(testimoni);
}

export async function deleteTestimoni(id: string) {
  const testimoni = await Testimoni.findByIdAndDelete(id);
  if (!testimoni) {
    throw new AppError(404, "NOT_FOUND", "Testimoni tidak ditemukan");
  }
  return { id: testimoni._id.toString() };
}
