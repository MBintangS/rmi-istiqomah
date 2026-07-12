import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { DonasiListItem, DonasiWritePayload } from "@/types/api";

export async function fetchDonasiList(): Promise<DonasiListItem[]> {
  const response = await apiGet<DonasiListItem[]>("/donasi");
  return response.data;
}

export async function createDonasi(payload: DonasiWritePayload) {
  return apiPost<DonasiListItem>("/donasi", payload);
}

export async function updateDonasi(id: string, payload: Partial<DonasiWritePayload>) {
  return apiPut<DonasiListItem>(`/donasi/${id}`, payload);
}

export async function deleteDonasi(id: string) {
  return apiDelete<{ id: string }>(`/donasi/${id}`);
}
