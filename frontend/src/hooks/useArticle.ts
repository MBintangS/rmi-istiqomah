"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchArtikelBySlug } from "@/services/artikel.service";

export function useArticle(slug: string) {
  return useQuery({
    queryKey: queryKeys.artikel.detail(slug),
    queryFn: () => fetchArtikelBySlug(slug),
    enabled: Boolean(slug),
  });
}
