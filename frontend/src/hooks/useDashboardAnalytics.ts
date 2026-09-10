"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchDashboardAnalytics } from "@/services/dashboard.service";

export function useDashboardAnalytics() {
  return useQuery({
    queryKey: queryKeys.dashboard.analytics(),
    queryFn: fetchDashboardAnalytics,
    staleTime: 5 * 60 * 1000,
  });
}
