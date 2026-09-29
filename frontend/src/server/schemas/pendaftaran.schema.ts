import { z } from "zod";

const whatsappSchema = z
  .string()
  .trim()
  .regex(/^[0-9+\-\s]{8,20}$/, "Nomor WhatsApp tidak valid");

export const createPendaftaranSchema = z
  .object({
    programId: z.string().trim().min(1, "Program wajib dipilih"),
    title: z.string().trim().min(3, "Judul minimal 3 karakter"),
    description: z.string().trim().optional(),
    opensAt: z.coerce.date(),
    closesAt: z.coerce.date(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => data.closesAt.getTime() > data.opensAt.getTime(), {
    message: "Tanggal tutup harus setelah tanggal buka",
    path: ["closesAt"],
  });

export const updatePendaftaranSchema = z
  .object({
    programId: z.string().trim().min(1, "Program wajib dipilih").optional(),
    title: z.string().trim().min(3, "Judul minimal 3 karakter").optional(),
    description: z.string().trim().optional(),
    opensAt: z.coerce.date().optional(),
    closesAt: z.coerce.date().optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => !data.opensAt || !data.closesAt || data.closesAt.getTime() > data.opensAt.getTime(), {
    message: "Tanggal tutup harus setelah tanggal buka",
    path: ["closesAt"],
  });

export const pendaftaranListQuerySchema = z.object({
  program: z.string().trim().optional(),
});

export const submitPesertaSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  whatsapp: whatsappSchema,
  age: z.coerce
    .number({ error: "Usia wajib diisi" })
    .int("Usia harus bilangan bulat")
    .min(1, "Usia minimal 1 tahun")
    .max(100, "Usia maksimal 100 tahun"),
  address: z.string().trim().min(5, "Alamat minimal 5 karakter").max(300, "Alamat maksimal 300 karakter"),
  email: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().email().safeParse(value).success, "Format email tidak valid"),
  notes: z.string().trim().max(1000, "Catatan maksimal 1000 karakter").optional(),
});

export type CreatePendaftaranInput = z.infer<typeof createPendaftaranSchema>;
export type UpdatePendaftaranInput = z.infer<typeof updatePendaftaranSchema>;
export type PendaftaranListQuery = z.infer<typeof pendaftaranListQuerySchema>;
export type SubmitPesertaInput = z.infer<typeof submitPesertaSchema>;
