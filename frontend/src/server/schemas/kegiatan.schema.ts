import { z } from "zod";
import { includeUnpublishedQuerySchema } from "./queryFlags.schema";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID tidak valid");

export const createKegiatanSchema = z
  .object({
    title: z.string().trim().min(1, "Judul wajib diisi"),
    description: z.string().min(1, "Deskripsi wajib diisi"),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
    time: z.string().trim().optional(),
    location: z.string().trim().optional(),
    locationMap: z.string().trim().optional(),
    category: objectIdSchema,
    thumbnail: z.string().url("URL thumbnail tidak valid").optional().or(z.literal("")),
    status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => !data.dateEnd || data.dateEnd >= data.dateStart, {
    message: "Tanggal selesai harus sama atau setelah tanggal mulai",
    path: ["dateEnd"],
  });

export const updateKegiatanSchema = z
  .object({
    title: z.string().trim().min(1, "Judul wajib diisi").optional(),
    description: z.string().min(1, "Deskripsi wajib diisi").optional(),
    dateStart: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional().nullable(),
    time: z.string().trim().optional(),
    location: z.string().trim().optional(),
    locationMap: z.string().trim().optional(),
    category: objectIdSchema.optional(),
    thumbnail: z.string().url("URL thumbnail tidak valid").optional().or(z.literal("")),
    status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
    isPublished: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.dateStart || !data.dateEnd) return true;
      return data.dateEnd >= data.dateStart;
    },
    {
      message: "Tanggal selesai harus sama atau setelah tanggal mulai",
      path: ["dateEnd"],
    },
  );

export const kegiatanListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
  sort: z.string().trim().optional(),
  includeUnpublished: includeUnpublishedQuerySchema,
});

export type CreateKegiatanInput = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanInput = z.infer<typeof updateKegiatanSchema>;
export type KegiatanListQuery = z.infer<typeof kegiatanListQuerySchema>;
