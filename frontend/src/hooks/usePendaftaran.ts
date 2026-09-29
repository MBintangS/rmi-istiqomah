"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchAdminPendaftaran,
  fetchAdminPendaftaranById,
  fetchOpenPendaftaran,
  fetchPeserta,
} from "@/services/pendaftaran.service";

export function useOpenPendaftaran(program?: string) {
  return useQuery({
    queryKey: queryKeys.pendaftaran.open(program),
    queryFn: () => fetchOpenPendaftaran(program),
  });
}

export function useAdminPendaftaran() {
  return useQuery({
    queryKey: queryKeys.pendaftaran.admin(),
    queryFn: fetchAdminPendaftaran,
  });
}

export function useAdminPendaftaranById(id: string) {
  return useQuery({
    queryKey: queryKeys.pendaftaran.detail(id),
    queryFn: () => fetchAdminPendaftaranById(id),
    enabled: Boolean(id),
  });
}

export function usePeserta(id: string) {
  return useQuery({
    queryKey: queryKeys.pendaftaran.peserta(id),
    queryFn: () => fetchPeserta(id),
    enabled: Boolean(id),
  });
}
