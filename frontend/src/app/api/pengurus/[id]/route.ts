import { authenticate, requirePengurus } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody } from "@/server/http";
import { updatePengurusSchema } from "@/server/schemas/organisasi.schema";
import { deletePengurus, updatePengurus } from "@/server/services/pengurus.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(authenticate(request));
    const data = await parseBody(request, updatePengurusSchema);
    return jsonSuccess(await updatePengurus(params.id, data), {
      message: "Pengurus berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requirePengurus(authenticate(request));
    return jsonSuccess(await deletePengurus(params.id), { message: "Pengurus berhasil dihapus" });
  });
}
