"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchDonasiList } from "@/services/donasi.service";

export function useDonasi() {
  return useQuery({
    queryKey: queryKeys.donasi.list(),
    queryFn: fetchDonasiList,
  });
}
