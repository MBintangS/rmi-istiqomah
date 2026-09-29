import { z } from "zod";

export const pendaftaranFormSchema = z
  .object({
    programId: z.string().min(1, "Program wajib dipilih"),
    title: z.string().trim().min(3, "Judul minimal 3 karakter"),
    description: z.string().optional(),
    opensAt: z.string().min(1, "Tanggal buka wajib diisi"),
    closesAt: z.string().min(1, "Tanggal tutup wajib diisi"),
    isPublished: z.boolean(),
  })
  .refine((values) => new Date(values.closesAt).getTime() > new Date(values.opensAt).getTime(), {
    message: "Tanggal tutup harus setelah tanggal buka",
    path: ["closesAt"],
  });

export type PendaftaranFormValues = z.infer<typeof pendaftaranFormSchema>;

export const pesertaFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,20}$/, "Nomor WhatsApp tidak valid"),
  age: z
    .string()
    .trim()
    .min(1, "Usia wajib diisi")
    .refine((value) => /^\d+$/.test(value), "Usia harus bilangan bulat")
    .refine((value) => {
      const age = Number(value);
      return age >= 1 && age <= 100;
    }, "Usia 1–100 tahun"),
  address: z.string().trim().min(5, "Alamat minimal 5 karakter").max(300, "Alamat maksimal 300 karakter"),
  email: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().email().safeParse(value).success, "Format email tidak valid"),
  notes: z.string().trim().max(1000, "Catatan maksimal 1000 karakter").optional(),
});

export type PesertaFormValues = z.infer<typeof pesertaFormSchema>;

export function toDatetimeLocalValue(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const pendaftaranStatusLabel: Record<string, string> = {
  draft: "Draf",
  scheduled: "Terjadwal",
  open: "Dibuka",
  closed: "Ditutup",
};
