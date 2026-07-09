import { apiGet } from "@/lib/api";
import type { BannerListItem } from "@/types/api";

export async function fetchBannerList(): Promise<BannerListItem[]> {
  const response = await apiGet<BannerListItem[]>("/banner");
  return response.data;
}
