import { z } from "zod";

export const kegiatanFormSchema = z
  .object({
    title: z.string().trim().min(3, "Judul minimal 3 karakter"),
    description: z.string().trim().min(10, "Deskripsi minimal 10 karakter"),
    dateStart: z.string().min(1, "Tanggal mulai wajib diisi"),
    dateEnd: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    locationMap: z.string().optional(),
    category: z.string().min(1, "Kategori wajib dipilih"),
    thumbnail: z.string().optional(),
    status: z.enum(["upcoming", "ongoing", "completed"]),
    isPublished: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.dateEnd) return true;
      return new Date(data.dateEnd) >= new Date(data.dateStart);
    },
    {
      message: "Tanggal selesai harus sama atau setelah tanggal mulai",
      path: ["dateEnd"],
    },
  );

export type KegiatanFormValues = z.infer<typeof kegiatanFormSchema>;
