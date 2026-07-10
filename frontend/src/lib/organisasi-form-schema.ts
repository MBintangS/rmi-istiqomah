import { z } from "zod";

export const pengurusFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  position: z.string().trim().min(2, "Jabatan minimal 2 karakter"),
  photo: z.string().optional(),
  period: z.string().optional(),
  order: z.number().int().min(0),
  isActive: z.boolean(),
});

export type PengurusFormValues = z.infer<typeof pengurusFormSchema>;

export const programFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  description: z.string().optional(),
  content: z.string().min(1, "Konten wajib diisi"),
  image: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean(),
});

export type ProgramFormValues = z.infer<typeof programFormSchema>;

export const dokumenFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  fileUrl: z.string().url("File wajib diupload"),
  fileSize: z.number().int().nonnegative().optional(),
  fileType: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  isPublished: z.boolean(),
});

export type DokumenFormValues = z.infer<typeof dokumenFormSchema>;
