import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { KategoriItem, KategoriWritePayload } from "@/types/api";

export async function fetchKategoriList(
  type?: "artikel" | "kegiatan" | "galeri",
): Promise<KategoriItem[]> {
  const response = await apiGet<KategoriItem[]>("/kategori", type ? { type } : undefined);
  return response.data;
}

export async function createKategori(payload: KategoriWritePayload) {
  return apiPost<KategoriItem>("/kategori", payload);
}

export async function updateKategori(id: string, payload: Partial<KategoriWritePayload>) {
  return apiPut<KategoriItem>(`/kategori/${id}`, payload);
}

export async function deleteKategori(id: string) {
  return apiDelete<{ id: string }>(`/kategori/${id}`);
}
