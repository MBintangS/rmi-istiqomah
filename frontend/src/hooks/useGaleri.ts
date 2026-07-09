"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchGaleriList } from "@/services/galeri.service";
import type { GaleriListParams } from "@/types/api";

export function useGaleri(params?: GaleriListParams) {
  return useQuery({
    queryKey: queryKeys.galeri.list(params),
    queryFn: () => fetchGaleriList(params),
  });
}
