import { apiRoute, jsonSuccess, parseQuery } from "@/server/http";
import { pendaftaranListQuerySchema } from "@/server/schemas/pendaftaran.schema";
import { listOpenPendaftaran } from "@/server/services/pendaftaran.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const query = parseQuery(request, pendaftaranListQuerySchema);
    return jsonSuccess(await listOpenPendaftaran(query));
  });
}
