"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchArtikelList } from "@/services/artikel.service";
import type { ArtikelListParams } from "@/types/api";

export function useArticles(params?: ArtikelListParams) {
  return useQuery({
    queryKey: queryKeys.artikel.list(params),
    queryFn: () => fetchArtikelList(params),
  });
}
