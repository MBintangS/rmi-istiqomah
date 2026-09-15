import { apiGet } from "@/lib/api";
import type { PrayerTimesResult } from "@/types/api";

export async function fetchPrayerTimes(params?: {
  date?: string;
  scope?: "day" | "month";
}): Promise<PrayerTimesResult> {
  const query: Record<string, unknown> = {};
  if (params?.date) query.date = params.date;
  if (params?.scope) query.scope = params.scope;
  const response = await apiGet<PrayerTimesResult>("/prayer-times", query);
  return response.data;
}
