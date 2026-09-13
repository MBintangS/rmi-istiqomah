import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess } from "@/server/http";
import { resendInvitation } from "@/server/services/user.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await resendInvitation(params.id), {
      message: "Email undangan berhasil dikirim ulang",
    });
  });
}
