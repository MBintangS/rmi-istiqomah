import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  AgendaListItem,
  AgendaListParams,
  AgendaListResult,
  AgendaWritePayload,
} from "@/types/api";

export async function fetchAgendaList(params?: AgendaListParams): Promise<AgendaListResult> {
  const response = await apiGet<AgendaListItem[]>("/agenda", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function fetchAgendaById(id: string): Promise<AgendaListItem> {
  const response = await apiGet<AgendaListItem>(`/agenda/${id}`);
  return response.data;
}

export async function createAgenda(payload: AgendaWritePayload) {
  return apiPost<AgendaListItem>("/agenda", payload);
}

export async function updateAgenda(id: string, payload: Partial<AgendaWritePayload>) {
  return apiPut<AgendaListItem>(`/agenda/${id}`, payload);
}

export async function deleteAgenda(id: string) {
  return apiDelete<{ id: string }>(`/agenda/${id}`);
}
