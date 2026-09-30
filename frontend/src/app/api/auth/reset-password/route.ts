import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { assertPasswordResetSubmitLimit } from "@/server/rate-limit";
import { resetPasswordSchema } from "@/server/schemas/user.schema";
import { resetPassword } from "@/server/services/password-reset.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return apiRoute(async () => {
    assertPasswordResetSubmitLimit(request);
    const data = await parseBody(request, resetPasswordSchema);
    return jsonSuccess(await resetPassword(data), {
      message: "Password berhasil diubah",
    });
  });
}
