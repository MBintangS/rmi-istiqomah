import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  KegiatanDetail,
  KegiatanListItem,
  KegiatanListParams,
  KegiatanListResult,
  KegiatanWritePayload,
} from "@/types/api";

export async function fetchKegiatanList(params?: KegiatanListParams): Promise<KegiatanListResult> {
  const response = await apiGet<KegiatanListItem[]>("/kegiatan", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function fetchKegiatanBySlug(slug: string): Promise<KegiatanDetail> {
  const response = await apiGet<KegiatanDetail>(`/kegiatan/${slug}`);
  return response.data;
}

export async function createKegiatan(payload: KegiatanWritePayload) {
  return apiPost<KegiatanDetail>("/kegiatan", payload);
}

export async function updateKegiatan(id: string, payload: Partial<KegiatanWritePayload>) {
  return apiPut<KegiatanDetail>(`/kegiatan/${id}`, payload);
}

export async function deleteKegiatan(id: string) {
  return apiDelete<{ id: string }>(`/kegiatan/${id}`);
}
