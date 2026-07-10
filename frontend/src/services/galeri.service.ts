import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  GaleriListItem,
  GaleriListParams,
  GaleriListResult,
  GaleriWritePayload,
} from "@/types/api";

export async function fetchGaleriList(params?: GaleriListParams): Promise<GaleriListResult> {
  const response = await apiGet<GaleriListItem[]>("/galeri", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function fetchGaleriById(id: string): Promise<GaleriListItem> {
  const response = await apiGet<GaleriListItem>(`/galeri/${id}`);
  return response.data;
}

export async function createGaleri(payload: GaleriWritePayload) {
  return apiPost<GaleriListItem>("/galeri", payload);
}

export async function updateGaleri(id: string, payload: Partial<GaleriWritePayload>) {
  return apiPut<GaleriListItem>(`/galeri/${id}`, payload);
}

export async function deleteGaleri(id: string) {
  return apiDelete<{ id: string }>(`/galeri/${id}`);
}
