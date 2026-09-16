import { z } from "zod";

export const doaListQuerySchema = z.object({
  grup: z.string().trim().min(1).max(120).optional(),
  tag: z.string().trim().min(1).max(60).optional(),
  q: z.string().trim().min(1).max(80).optional(),
});

export const doaIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DoaListQuery = z.infer<typeof doaListQuerySchema>;
