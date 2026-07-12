import { z } from "zod";

const galeriImageSchema = z.object({
  url: z.string().url("URL gambar tidak valid"),
  publicId: z.string().optional(),
  caption: z.string().optional(),
});

export const galeriFormSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter"),
  images: z.array(galeriImageSchema).min(1, "Minimal satu gambar"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  eventId: z.string().optional(),
  order: z.number().int().min(0),
  isPublished: z.boolean(),
});

export type GaleriFormValues = z.infer<typeof galeriFormSchema>;

export const bannerFormSchema = z.object({
  title: z.string().trim().min(2, "Judul minimal 2 karakter"),
  image: z.string().url("Gambar wajib diupload"),
  link: z.string().optional(),
  order: z.number().int().min(0),
  isActive: z.boolean(),
});

export type BannerFormValues = z.infer<typeof bannerFormSchema>;
