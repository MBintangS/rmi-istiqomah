import { z } from "zod";

export const createDokumenSchema = z.object({
  name: z.string().trim().min(1, "Nama dokumen wajib diisi"),
  fileUrl: z.string().url("URL file tidak valid"),
  fileSize: z.coerce.number().int().nonnegative().optional(),
  fileType: z.string().trim().optional(),
  category: z.string().trim().optional(),
  description: z.string().trim().optional(),
  isPublished: z.boolean().optional(),
});

export const updateDokumenSchema = createDokumenSchema.partial();

export const dokumenListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().trim().email("Email tidak valid"),
  subject: z.string().trim().min(1, "Subjek wajib diisi"),
  message: z.string().trim().min(1, "Pesan wajib diisi"),
});

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1, "Kata kunci pencarian wajib diisi"),
  limit: z.coerce.number().int().positive().max(20).optional(),
});

const socialMediaSchema = z.object({
  instagram: z.string().trim().optional(),
  facebook: z.string().trim().optional(),
  youtube: z.string().trim().optional(),
  tiktok: z.string().trim().optional(),
});

const siteStatsSchema = z.object({
  totalEvents: z.coerce.number().int().nonnegative().optional(),
  totalMembers: z.coerce.number().int().nonnegative().optional(),
  totalPengurus: z.coerce.number().int().nonnegative().optional(),
  establishedYear: z.coerce.number().int().optional(),
});

export const updateSettingsSchema = z.object({
  siteName: z.string().trim().min(1).optional(),
  tagline: z.string().trim().min(1).optional(),
  about: z.string().trim().min(1).optional(),
  vision: z.string().trim().min(1).optional(),
  mission: z.array(z.string().trim().min(1)).optional(),
  address: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(1).optional(),
  whatsapp: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  socialMedia: socialMediaSchema.optional(),
  googleMapsEmbed: z.string().optional(),
  stats: siteStatsSchema.optional(),
});

export type CreateDokumenInput = z.infer<typeof createDokumenSchema>;
export type UpdateDokumenInput = z.infer<typeof updateDokumenSchema>;
export type DokumenListQuery = z.infer<typeof dokumenListQuerySchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
