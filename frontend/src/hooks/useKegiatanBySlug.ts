"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchKegiatanBySlug } from "@/services/kegiatan.service";

export function useKegiatanBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.kegiatan.detail(slug),
    queryFn: () => fetchKegiatanBySlug(slug),
    enabled: Boolean(slug),
  });
}
