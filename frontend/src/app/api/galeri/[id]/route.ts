import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { updateGaleriSchema } from "@/server/schemas/galeri.schema";
import { deleteGaleri, getGaleriById, updateGaleri } from "@/server/services/galeri.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await getGaleriById(params.id, queryObject(request), user));
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, updateGaleriSchema);
    return jsonSuccess(await updateGaleri(params.id, data), { message: "Galeri berhasil diperbarui" });
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await deleteGaleri(params.id), { message: "Galeri berhasil dihapus" });
  });
}
