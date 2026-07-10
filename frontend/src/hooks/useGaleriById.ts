"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchGaleriById } from "@/services/galeri.service";

export function useGaleriById(id: string) {
  return useQuery({
    queryKey: queryKeys.galeri.detail(id),
    queryFn: () => fetchGaleriById(id),
    enabled: Boolean(id),
  });
}
