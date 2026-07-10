"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchAgendaById, fetchAgendaList } from "@/services/agenda.service";
import type { AgendaListParams } from "@/types/api";

export function useAgendaList(params?: AgendaListParams) {
  return useQuery({
    queryKey: queryKeys.agenda.list(params),
    queryFn: () => fetchAgendaList(params),
  });
}

export function useAgendaById(id: string) {
  return useQuery({
    queryKey: queryKeys.agenda.detail(id),
    queryFn: () => fetchAgendaById(id),
    enabled: Boolean(id),
  });
}
