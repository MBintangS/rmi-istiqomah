import { apiGet } from "@/lib/api";
import type { GaleriListItem, GaleriListParams, GaleriListResult } from "@/types/api";

export async function fetchGaleriList(params?: GaleriListParams): Promise<GaleriListResult> {
  const response = await apiGet<GaleriListItem[]>("/galeri", params as Record<string, unknown>);

  return {
    items: response.data,
    pagination: response.pagination,
  };
}
