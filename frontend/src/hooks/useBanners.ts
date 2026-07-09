"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchBannerList } from "@/services/banner.service";

export function useBanners() {
  return useQuery({
    queryKey: queryKeys.banner.list(),
    queryFn: fetchBannerList,
  });
}
