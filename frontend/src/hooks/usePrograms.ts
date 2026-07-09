"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchProgramList } from "@/services/program.service";

export function usePrograms() {
  return useQuery({
    queryKey: queryKeys.program.list(),
    queryFn: fetchProgramList,
  });
}
