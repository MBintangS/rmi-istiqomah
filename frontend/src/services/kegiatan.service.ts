import { apiGet } from "@/lib/api";
import type {
  KegiatanDetail,
  KegiatanListItem,
  KegiatanListParams,
  KegiatanListResult,
} from "@/types/api";

export async function fetchKegiatanList(params?: KegiatanListParams): Promise<KegiatanListResult> {
  const response = await apiGet<KegiatanListItem[]>("/kegiatan", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}

export async function fetchKegiatanBySlug(slug: string): Promise<KegiatanDetail> {
  const response = await apiGet<KegiatanDetail>(`/kegiatan/${slug}`);
  return response.data;
}
