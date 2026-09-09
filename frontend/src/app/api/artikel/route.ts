import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, parseQuery } from "@/server/http";
import { artikelListQuerySchema, createArtikelSchema } from "@/server/schemas/artikel.schema";
import { createArtikel, listArtikel } from "@/server/services/artikel.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    const query = parseQuery(request, artikelListQuerySchema);
    const result = await listArtikel(query, user);
    return jsonSuccess(result.data, { pagination: result.pagination });
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    const user = requireAdmin(authenticate(request));
    const data = await parseBody(request, createArtikelSchema);
    return jsonSuccess(await createArtikel(data, user), {
      status: 201,
      message: "Artikel berhasil dibuat",
    });
  });
}
