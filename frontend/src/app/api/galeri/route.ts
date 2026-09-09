import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, parseQuery } from "@/server/http";
import { createGaleriSchema, galeriListQuerySchema } from "@/server/schemas/galeri.schema";
import { createGaleri, listGaleri } from "@/server/services/galeri.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    const query = parseQuery(request, galeriListQuerySchema);
    const result = await listGaleri(query, user);
    return jsonSuccess(result.data, { pagination: result.pagination });
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, createGaleriSchema);
    return jsonSuccess(await createGaleri(data), {
      status: 201,
      message: "Galeri berhasil dibuat",
    });
  });
}
