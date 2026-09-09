import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateSettingsSchema } from "@/server/schemas/misc.schema";
import { getSettings, updateSettings } from "@/server/services/settings.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return apiRoute(async () => jsonSuccess(await getSettings()));
}

export async function PUT(request: Request) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateSettingsSchema);
    return jsonSuccess(await updateSettings(data), { message: "Pengaturan berhasil diperbarui" });
  });
}
