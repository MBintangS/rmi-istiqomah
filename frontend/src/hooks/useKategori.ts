"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchKategoriList } from "@/services/kategori.service";

export function useKategori(type?: "artikel" | "kegiatan" | "galeri") {
  return useQuery({
    queryKey: queryKeys.kategori.list(type),
    queryFn: () => fetchKategoriList(type),
  });
}
