import { z } from "zod";

export const artikelFormSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter"),
  content: z.string().trim().min(10, "Konten minimal 10 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  thumbnail: z.string().optional(),
  status: z.enum(["draft", "published"]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ArtikelFormValues = z.infer<typeof artikelFormSchema>;
