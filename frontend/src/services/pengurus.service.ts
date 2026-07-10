import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { PengurusListItem, PengurusWritePayload } from "@/types/api";

export async function fetchPengurusList(): Promise<PengurusListItem[]> {
  const response = await apiGet<PengurusListItem[]>("/pengurus");
  return response.data;
}

export async function createPengurus(payload: PengurusWritePayload) {
  return apiPost<PengurusListItem>("/pengurus", payload);
}

export async function updatePengurus(id: string, payload: Partial<PengurusWritePayload>) {
  return apiPut<PengurusListItem>(`/pengurus/${id}`, payload);
}

export async function deletePengurus(id: string) {
  return apiDelete<{ id: string }>(`/pengurus/${id}`);
}
