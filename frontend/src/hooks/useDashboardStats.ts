"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchDashboardStats } from "@/services/dashboard.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: fetchDashboardStats,
  });
}
