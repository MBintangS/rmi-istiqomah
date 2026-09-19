"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchQuranCatalog, fetchQuranSurat } from "@/services/quran.service";

export function useQuranCatalog() {
  return useQuery({
    queryKey: queryKeys.quran.list(),
    queryFn: fetchQuranCatalog,
    staleTime: 60 * 60 * 1000,
  });
}

export function useQuranSurat(nomor: number) {
  return useQuery({
    queryKey: queryKeys.quran.surat(nomor),
    queryFn: () => fetchQuranSurat(nomor),
    enabled: nomor >= 1 && nomor <= 114,
    staleTime: 60 * 60 * 1000,
  });
}
