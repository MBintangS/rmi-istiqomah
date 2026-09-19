import { z } from "zod";

export const quranSuratNomorSchema = z.object({
  nomor: z.coerce.number().int().min(1).max(114),
});

export type QuranSuratNomor = z.infer<typeof quranSuratNomorSchema>;
