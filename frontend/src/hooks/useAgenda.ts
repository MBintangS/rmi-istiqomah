"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchAgendaList, fetchUpcomingAgenda } from "@/services/agenda.service";

export function useUpcomingAgenda() {
  return useQuery({
    queryKey: queryKeys.agenda.upcoming(),
    queryFn: fetchUpcomingAgenda,
  });
}

export function useAgenda(params?: { page?: number; limit?: number; sort?: string }) {
  return useQuery({
    queryKey: queryKeys.agenda.list(params),
    queryFn: () => fetchAgendaList(params),
  });
}
