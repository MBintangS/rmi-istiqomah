import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { BannerListItem, BannerWritePayload } from "@/types/api";

export async function fetchBannerList(): Promise<BannerListItem[]> {
  const response = await apiGet<BannerListItem[]>("/banner");
  return response.data;
}

export async function createBanner(payload: BannerWritePayload) {
  return apiPost<BannerListItem>("/banner", payload);
}

export async function updateBanner(id: string, payload: Partial<BannerWritePayload>) {
  return apiPut<BannerListItem>(`/banner/${id}`, payload);
}

export async function deleteBanner(id: string) {
  return apiDelete<{ id: string }>(`/banner/${id}`);
}
