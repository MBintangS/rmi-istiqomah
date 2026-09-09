import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, parseQuery } from "@/server/http";
import { createKegiatanSchema, kegiatanListQuerySchema } from "@/server/schemas/kegiatan.schema";
import { createKegiatan, listKegiatan } from "@/server/services/kegiatan.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    const query = parseQuery(request, kegiatanListQuerySchema);
    const result = await listKegiatan(query, user);
    return jsonSuccess(result.data, { pagination: result.pagination });
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, createKegiatanSchema);
    return jsonSuccess(await createKegiatan(data), {
      status: 201,
      message: "Kegiatan berhasil dibuat",
    });
  });
}
