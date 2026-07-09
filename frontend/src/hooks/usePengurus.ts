"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchPengurusList } from "@/services/pengurus.service";

export function usePengurus() {
  return useQuery({
    queryKey: queryKeys.pengurus.list(),
    queryFn: fetchPengurusList,
  });
}
