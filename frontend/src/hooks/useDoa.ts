"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchDoaById, fetchDoaCatalog } from "@/services/doa.service";

export function useDoaCatalog() {
  return useQuery({
    queryKey: queryKeys.doa.list(),
    queryFn: fetchDoaCatalog,
    staleTime: 60 * 60 * 1000,
  });
}

export function useDoaDetail(id: number | null) {
  return useQuery({
    queryKey: queryKeys.doa.detail(id ?? 0),
    queryFn: () => fetchDoaById(id as number),
    enabled: id != null && id > 0,
  });
}
