import { apiHandler, jsonSuccess } from "@/server/http";
import { AppError } from "@/server/errors";
import { quranSuratNomorSchema } from "@/server/schemas/quran.schema";
import { getQuranSurat } from "@/server/services/quran.service";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: { nomor: string } }) {
  return apiHandler(async () => {
    const parsed = quranSuratNomorSchema.safeParse(context.params);
    if (!parsed.success) {
      throw new AppError(400, "VALIDATION_ERROR", "Nomor surat harus 1–114");
    }
    return jsonSuccess(await getQuranSurat(parsed.data.nomor));
  });
}
