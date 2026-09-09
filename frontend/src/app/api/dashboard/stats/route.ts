import { authenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess } from "@/server/http";
import { getDashboardStats } from "@/server/services/stats.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await getDashboardStats());
  });
}
