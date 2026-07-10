import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID tidak valid");

export const createArtikelSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
  category: objectIdSchema,
  thumbnail: z.string().url("URL thumbnail tidak valid").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).optional(),
  excerpt: z.string().trim().optional(),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
});

export const updateArtikelSchema = createArtikelSchema.partial();

export const artikelListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  status: z.enum(["draft", "published"]).optional(),
  sort: z.string().trim().optional(),
});

export const createKategoriSchema = z.object({
  name: z.string().trim().min(1, "Nama kategori wajib diisi"),
  type: z.enum(["artikel", "kegiatan", "galeri"]),
  slug: z.string().trim().min(1).optional(),
});

export const updateKategoriSchema = z.object({
  name: z.string().trim().min(1, "Nama kategori wajib diisi").optional(),
  type: z.enum(["artikel", "kegiatan", "galeri"]).optional(),
  slug: z.string().trim().min(1).optional(),
});

export const kategoriListQuerySchema = z.object({
  type: z.enum(["artikel", "kegiatan", "galeri"]).optional(),
});

export type CreateArtikelInput = z.infer<typeof createArtikelSchema>;
export type UpdateArtikelInput = z.infer<typeof updateArtikelSchema>;
export type ArtikelListQuery = z.infer<typeof artikelListQuerySchema>;
export type CreateKategoriInput = z.infer<typeof createKategoriSchema>;
export type UpdateKategoriInput = z.infer<typeof updateKategoriSchema>;
export type KategoriListQuery = z.infer<typeof kategoriListQuerySchema>;
