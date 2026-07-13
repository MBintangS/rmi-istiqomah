import { z } from "zod";
import { includeUnpublishedQuerySchema } from "./queryFlags.schema";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID tidak valid");

const galeriImageSchema = z.object({
  url: z.string().url("URL gambar tidak valid"),
  publicId: z.string().trim().optional(),
  caption: z.string().trim().optional(),
});

export const createGaleriSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi"),
  images: z.array(galeriImageSchema).min(1, "Minimal satu gambar diperlukan"),
  videoUrl: z.string().trim().optional(),
  category: objectIdSchema,
  eventId: objectIdSchema.optional(),
  order: z.coerce.number().int().optional(),
  isPublished: z.boolean().optional(),
});

export const updateGaleriSchema = createGaleriSchema.partial();

export const galeriListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  eventId: objectIdSchema.optional(),
  sort: z.string().trim().optional(),
  includeUnpublished: includeUnpublishedQuerySchema,
});

export const createBannerSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi"),
  image: z.string().url("URL gambar tidak valid"),
  link: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateBannerSchema = createBannerSchema.partial();

export type CreateGaleriInput = z.infer<typeof createGaleriSchema>;
export type UpdateGaleriInput = z.infer<typeof updateGaleriSchema>;
export type GaleriListQuery = z.infer<typeof galeriListQuerySchema>;
export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;
