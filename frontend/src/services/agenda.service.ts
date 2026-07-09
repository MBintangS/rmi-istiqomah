import { apiGet } from "@/lib/api";
import type { AgendaListItem } from "@/types/api";

export async function fetchUpcomingAgenda(): Promise<AgendaListItem[]> {
  const response = await apiGet<AgendaListItem[]>("/agenda/upcoming");
  return response.data;
}

export async function fetchAgendaList(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}): Promise<AgendaListItem[]> {
  const response = await apiGet<AgendaListItem[]>("/agenda", params as Record<string, unknown>);
  return response.data;
}
