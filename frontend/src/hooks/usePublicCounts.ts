"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchPublicCounts } from "@/services/stats.service";

export function usePublicCounts() {
  return useQuery({
    queryKey: queryKeys.stats.count(),
    queryFn: fetchPublicCounts,
    staleTime: 60 * 1000,
  });
}
