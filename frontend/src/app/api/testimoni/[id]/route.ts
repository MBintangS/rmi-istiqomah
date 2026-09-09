import { authenticate, requireSuperAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updateTestimoniSchema } from "@/server/schemas/organisasi.schema";
import { deleteTestimoni, updateTestimoni } from "@/server/services/testimoni.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    const data = await parseBody(request, updateTestimoniSchema);
    return jsonSuccess(await updateTestimoni(params.id, data), {
      message: "Testimoni berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireSuperAdmin(authenticate(request));
    return jsonSuccess(await deleteTestimoni(params.id), { message: "Testimoni berhasil dihapus" });
  });
}
