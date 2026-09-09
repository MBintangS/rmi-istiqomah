import { z } from "zod";

/** Optional CMS flag — only honored for admin/superadmin (see canViewUnpublished). */
export const includeUnpublishedQuerySchema = z
  .union([z.literal("true"), z.literal("false"), z.literal("1"), z.literal("0"), z.boolean()])
  .optional()
  .transform((value) => value === true || value === "true" || value === "1");
