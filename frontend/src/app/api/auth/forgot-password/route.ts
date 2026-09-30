import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { assertPasswordResetRequestLimit } from "@/server/rate-limit";
import { forgotPasswordSchema } from "@/server/schemas/user.schema";
import { requestPasswordReset } from "@/server/services/password-reset.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return apiRoute(async () => {
    const data = await parseBody(request, forgotPasswordSchema);
    assertPasswordResetRequestLimit(request, data.email);
    await requestPasswordReset(data.email);
    return jsonSuccess(
      { ok: true },
      {
        message: "Jika email terdaftar pada akun aktif, tautan reset password telah dikirim.",
      },
    );
  });
}
