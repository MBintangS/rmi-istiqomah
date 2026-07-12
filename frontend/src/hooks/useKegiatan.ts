"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchKegiatanList } from "@/services/kegiatan.service";
import type { KegiatanListParams } from "@/types/api";

export function useKegiatan(params?: KegiatanListParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.kegiatan.list(params),
    queryFn: () => fetchKegiatanList(params),
    enabled: options?.enabled ?? true,
  });
}
