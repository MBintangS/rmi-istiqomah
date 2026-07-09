import { apiGet } from "@/lib/api";
import type { DokumenListItem, DokumenListParams, DokumenListResult } from "@/types/api";

export async function fetchDokumenList(params?: DokumenListParams): Promise<DokumenListResult> {
  const response = await apiGet<DokumenListItem[]>("/dokumen", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}
