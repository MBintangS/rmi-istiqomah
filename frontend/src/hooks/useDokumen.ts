"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchDokumenList } from "@/services/dokumen.service";
import type { DokumenListParams } from "@/types/api";

export function useDokumen(params?: DokumenListParams) {
  return useQuery({
    queryKey: queryKeys.dokumen.list(params),
    queryFn: () => fetchDokumenList(params),
  });
}
