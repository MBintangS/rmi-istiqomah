import { z } from "zod";

export const createDonasiSchema = z.object({
  bank: z.string().trim().min(1, "Nama bank wajib diisi"),
  accountNumber: z.string().trim().min(1, "Nomor rekening wajib diisi"),
  accountName: z.string().trim().min(1, "Nama akun bank wajib diisi"),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const updateDonasiSchema = createDonasiSchema.partial();

export type CreateDonasiInput = z.infer<typeof createDonasiSchema>;
export type UpdateDonasiInput = z.infer<typeof updateDonasiSchema>;
