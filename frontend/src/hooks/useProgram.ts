"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchProgramBySlug } from "@/services/program.service";

export function useProgram(slug: string) {
  return useQuery({
    queryKey: queryKeys.program.detail(slug),
    queryFn: () => fetchProgramBySlug(slug),
    enabled: Boolean(slug),
  });
}
