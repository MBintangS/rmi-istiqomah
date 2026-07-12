import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  whatsapp: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[0-9+\-\s]{8,20}$/.test(value),
      "Nomor WhatsApp tidak valid",
    ),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
