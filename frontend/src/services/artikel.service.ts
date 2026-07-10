import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  ArtikelDetail,
  ArtikelListItem,
  ArtikelListParams,
  ArtikelListResult,
  ArtikelWritePayload,
} from "@/types/api";

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

export async function createArtikel(payload: ArtikelWritePayload) {
  return apiPost<ArtikelDetail>("/artikel", payload);
}

export async function updateArtikel(id: string, payload: Partial<ArtikelWritePayload>) {
  return apiPut<ArtikelDetail>(`/artikel/${id}`, payload);
}

export async function deleteArtikel(id: string) {
  return apiDelete<{ id: string }>(`/artikel/${id}`);
}
