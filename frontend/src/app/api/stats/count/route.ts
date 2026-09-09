import { apiRoute, jsonSuccess } from "@/server/http";
import { getPublicCounts } from "@/server/services/stats.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiRoute(async () => jsonSuccess(await getPublicCounts()));
}
