import { authenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateDokumenSchema } from "@/server/schemas/misc.schema";
import { deleteDokumen, updateDokumen } from "@/server/services/dokumen.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, updateDokumenSchema);
    return jsonSuccess(await updateDokumen(params.id, data), {
      message: "Dokumen berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await deleteDokumen(params.id), { message: "Dokumen berhasil dihapus" });
  });
}
