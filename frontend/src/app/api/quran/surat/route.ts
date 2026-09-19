import { apiHandler, jsonSuccess } from "@/server/http";
import { getQuranCatalog } from "@/server/services/quran.service";

export const runtime = "nodejs";

export async function GET() {
  return apiHandler(async () => jsonSuccess(await getQuranCatalog()));
}
