import { apiGet } from "@/lib/api";
import type { ArtikelDetail, ArtikelListItem, ArtikelListParams, ArtikelListResult } from "@/types/api";

export async function fetchArtikelList(params?: ArtikelListParams): Promise<ArtikelListResult> {
  const response = await apiGet<ArtikelListItem[]>("/artikel", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function fetchArtikelBySlug(slug: string): Promise<ArtikelDetail> {
  const response = await apiGet<ArtikelDetail>(`/artikel/${slug}`);
  return response.data;
}
