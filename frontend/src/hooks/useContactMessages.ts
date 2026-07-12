"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchContactMessages } from "@/services/contact.service";

export function useContactMessages() {
  return useQuery({
    queryKey: queryKeys.contact.list(),
    queryFn: fetchContactMessages,
  });
}
