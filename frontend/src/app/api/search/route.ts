import { apiRoute, jsonSuccess, parseQuery } from "@/server/http";
import { searchQuerySchema } from "@/server/schemas/misc.schema";
import { globalSearch } from "@/server/services/search.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return apiRoute(async () => {
    const query = parseQuery(request, searchQuerySchema);
    return jsonSuccess(await globalSearch(query));
  });
}
