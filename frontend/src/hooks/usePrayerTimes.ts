"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchPrayerTimes } from "@/services/prayer-times.service";

export function usePrayerTimes(date?: string, scope: "day" | "month" = "day") {
  return useQuery({
    queryKey:
      scope === "month" ? queryKeys.prayerTimes.month(date) : queryKeys.prayerTimes.day(date),
    queryFn: () => fetchPrayerTimes({ date, scope }),
    placeholderData: keepPreviousData,
  });
}
