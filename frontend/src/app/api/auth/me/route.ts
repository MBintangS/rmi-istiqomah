import { authenticate } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateProfileSchema } from "@/server/schemas/user.schema";
import { getMe, updateMe } from "@/server/services/auth.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = authenticate(request);
    return jsonSuccess(await getMe(user.id));
  });
}

export async function PUT(request: Request) {
  return apiRoute(async () => {
    const user = authenticate(request);
    const data = await parseBody(request, updateProfileSchema);
    return jsonSuccess(await updateMe(user.id, data), {
      message: "Profil berhasil diperbarui",
    });
  });
}
