"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchUsersList } from "@/services/users.service";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: fetchUsersList,
  });
}
