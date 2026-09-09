import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, queryObject } from "@/server/http";
import { updateArtikelSchema } from "@/server/schemas/artikel.schema";
import { deleteArtikel, getArtikelBySlug, updateArtikel } from "@/server/services/artikel.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    return jsonSuccess(await getArtikelBySlug(params.slug, queryObject(request), user));
  });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, updateArtikelSchema);
    return jsonSuccess(await updateArtikel(params.slug, data), { message: "Artikel berhasil diperbarui" });
  });
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    return jsonSuccess(await deleteArtikel(params.slug), { message: "Artikel berhasil dihapus" });
  });
}
