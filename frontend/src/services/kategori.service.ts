import { apiGet } from "@/lib/api";
import type { KategoriItem } from "@/types/api";

export async function fetchKategoriList(type?: "artikel" | "kegiatan" | "galeri"): Promise<KategoriItem[]> {
  const response = await apiGet<KategoriItem[]>("/kategori", type ? { type } : undefined);
  return response.data;
}
