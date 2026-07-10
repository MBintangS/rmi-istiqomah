import { z } from "zod";

export const testimoniFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  content: z.string().trim().min(10, "Testimoni minimal 10 karakter"),
  role: z.string().optional(),
  photo: z.string().optional(),
  order: z.number().int().min(0),
  isActive: z.boolean(),
});

export type TestimoniFormValues = z.infer<typeof testimoniFormSchema>;

export const kategoriFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  type: z.enum(["artikel", "kegiatan", "galeri"]),
  slug: z.string().optional(),
});

export type KategoriFormValues = z.infer<typeof kategoriFormSchema>;

export const settingsFormSchema = z.object({
  siteName: z.string().trim().min(2, "Nama situs wajib diisi"),
  tagline: z.string().trim().min(2, "Tagline wajib diisi"),
  about: z.string().trim().min(10, "Tentang wajib diisi"),
  vision: z.string().trim().min(5, "Visi wajib diisi"),
  missionText: z.string().trim().min(1, "Minimal satu misi"),
  address: z.string().trim().min(5, "Alamat wajib diisi"),
  phone: z.string().trim().min(5, "Telepon wajib diisi"),
  whatsapp: z.string().trim().min(8, "WhatsApp wajib diisi"),
  email: z.string().trim().email("Email tidak valid"),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  googleMapsEmbed: z.string().optional(),
  totalEvents: z.number().int().min(0),
  totalMembers: z.number().int().min(0),
  totalPengurus: z.number().int().min(0),
  establishedYear: z.number().int().min(1900).max(2100),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
