import { apiHandler, jsonSuccess, parseQuery } from "@/server/http";
import { doaListQuerySchema } from "@/server/schemas/doa.schema";
import { getDoaCatalog } from "@/server/services/doa.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return apiHandler(async () => {
    const query = parseQuery(request, doaListQuerySchema);
    return jsonSuccess(await getDoaCatalog(query));
  });
}
