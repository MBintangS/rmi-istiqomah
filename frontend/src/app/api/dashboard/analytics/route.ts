import { authenticate, requireAdmin } from "@/server/auth";
import { apiHandler, jsonSuccess } from "@/server/http";
import { getDashboardAnalytics } from "@/server/services/analytics.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiHandler(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await getDashboardAnalytics());
  });
}
