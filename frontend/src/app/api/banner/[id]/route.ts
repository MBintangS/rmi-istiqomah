import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateBannerSchema } from "@/server/schemas/galeri.schema";
import { deleteBanner, updateBanner } from "@/server/services/banner.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateBannerSchema);
    return jsonSuccess(await updateBanner(params.id, data), { message: "Banner berhasil diperbarui" });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteBanner(params.id), { message: "Banner berhasil dihapus" });
  });
}
