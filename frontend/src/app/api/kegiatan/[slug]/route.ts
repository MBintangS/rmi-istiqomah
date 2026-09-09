import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { updateKegiatanSchema } from "@/server/schemas/kegiatan.schema";
import { deleteKegiatan, getKegiatanBySlug, updateKegiatan } from "@/server/services/kegiatan.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await getKegiatanBySlug(params.slug, queryObject(request), user));
  });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, updateKegiatanSchema);
    return jsonSuccess(await updateKegiatan(params.slug, data), {
      message: "Kegiatan berhasil diperbarui",
    });
  });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await deleteKegiatan(params.slug), { message: "Kegiatan berhasil dihapus" });
  });
}
