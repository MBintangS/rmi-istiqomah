import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { activateInvitationSchema } from "@/server/schemas/user.schema";
import { activateInvitation } from "@/server/services/user.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return apiRoute(async () => {
    const data = await parseBody(request, activateInvitationSchema);
    return jsonSuccess(await activateInvitation(data), {
      message: "Akun berhasil diaktifkan",
    });
  });
}
