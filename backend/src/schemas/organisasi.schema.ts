import { z } from "zod";

export const createPengurusSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  position: z.string().trim().min(1, "Jabatan wajib diisi"),
  photo: z.string().url("URL foto tidak valid").optional().or(z.literal("")),
  period: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updatePengurusSchema = createPengurusSchema.partial();

export const createProgramSchema = z.object({
  name: z.string().trim().min(1, "Nama program wajib diisi"),
  description: z.string().trim().optional(),
  content: z.string().optional(),
  image: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  icon: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

export const updateProgramSchema = createProgramSchema.partial();

export const createTestimoniSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  content: z.string().trim().min(1, "Isi testimoni wajib diisi"),
  role: z.string().trim().optional(),
  photo: z.string().url("URL foto tidak valid").optional().or(z.literal("")),
  order: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateTestimoniSchema = createTestimoniSchema.partial();

export type CreatePengurusInput = z.infer<typeof createPengurusSchema>;
export type UpdatePengurusInput = z.infer<typeof updatePengurusSchema>;
export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>;
export type CreateTestimoniInput = z.infer<typeof createTestimoniSchema>;
export type UpdateTestimoniInput = z.infer<typeof updateTestimoniSchema>;
