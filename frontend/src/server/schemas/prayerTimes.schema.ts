import { z } from "zod";

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal harus berformat YYYY-MM-DD")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Tanggal tidak valid");

export const prayerTimesQuerySchema = z.object({
  date: isoDateSchema.optional(),
  scope: z.enum(["day", "month"]).optional().default("day"),
});

export type PrayerTimesQuery = z.infer<typeof prayerTimesQuerySchema>;
