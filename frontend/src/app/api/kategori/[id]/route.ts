import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateKategoriSchema } from "@/server/schemas/artikel.schema";
import { deleteKategori, updateKategori } from "@/server/services/kategori.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateKategoriSchema);
    return jsonSuccess(await updateKategori(params.id, data), { message: "Kategori berhasil diperbarui" });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteKategori(params.id), { message: "Kategori berhasil dihapus" });
  });
}
