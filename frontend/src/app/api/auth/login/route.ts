import { apiRoute, jsonSuccess } from "@/server/http";
import { assertLoginRateLimit } from "@/server/rate-limit";
import { login } from "@/server/services/auth.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return apiRoute(async () => {
    assertLoginRateLimit(request);
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const data = await login(body.email, body.password);
    return jsonSuccess(data);
  });
}
