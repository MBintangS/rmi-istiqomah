import { apiHandler, jsonSuccess, parseQuery } from "@/server/http";
import { prayerTimesQuerySchema } from "@/server/schemas/prayerTimes.schema";
import { getPrayerTimes } from "@/server/services/prayer-times.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return apiHandler(async () => {
    const query = parseQuery(request, prayerTimesQuerySchema);
    return jsonSuccess(await getPrayerTimes(query));
  });
}
