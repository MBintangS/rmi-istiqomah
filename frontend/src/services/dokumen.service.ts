import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  DokumenListItem,
  DokumenListParams,
  DokumenListResult,
  DokumenWritePayload,
} from "@/types/api";

export async function fetchDokumenList(params?: DokumenListParams): Promise<DokumenListResult> {
  const response = await apiGet<DokumenListItem[]>("/dokumen", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function createDokumen(payload: DokumenWritePayload) {
  return apiPost<DokumenListItem>("/dokumen", payload);
}

export async function updateDokumen(id: string, payload: Partial<DokumenWritePayload>) {
  return apiPut<DokumenListItem>(`/dokumen/${id}`, payload);
}

export async function deleteDokumen(id: string) {
  return apiDelete<{ id: string }>(`/dokumen/${id}`);
}
