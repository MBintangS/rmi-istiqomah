import { authenticate, optionalAuthenticate, requireAdmin } from "@/server/auth";
import { apiRoute, jsonSuccess, parseBody, parseQuery } from "@/server/http";
import { createDokumenSchema, dokumenListQuerySchema } from "@/server/schemas/misc.schema";
import { createDokumen, listDokumen } from "@/server/services/dokumen.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const user = optionalAuthenticate(request);
    const query = parseQuery(request, dokumenListQuerySchema);
    const result = await listDokumen(query, user);
    return jsonSuccess(result.data, { pagination: result.pagination });
  });
}

export async function POST(request: Request) {
  return apiRoute(async () => {
    requireAdmin(authenticate(request));
    const data = await parseBody(request, createDokumenSchema);
    return jsonSuccess(await createDokumen(data), {
      status: 201,
      message: "Dokumen berhasil dibuat",
    });
  });
}
