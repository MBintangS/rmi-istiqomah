"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchTestimoniList } from "@/services/testimoni.service";

export function useTestimoni() {
  return useQuery({
    queryKey: queryKeys.testimoni.list(),
    queryFn: fetchTestimoniList,
  });
}
