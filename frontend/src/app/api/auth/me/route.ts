import { authenticate } from "@/server/auth";
import { apiRoute, jsonSuccess } from "@/server/http";
import { getMe } from "@/server/services/auth.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = authenticate(request);
    return jsonSuccess(await getMe(user.id));
  });
}
