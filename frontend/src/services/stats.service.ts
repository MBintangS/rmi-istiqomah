import { apiGet } from "@/lib/api";
import type { PublicContentCounts } from "@/types/api";

export async function fetchPublicCounts(): Promise<PublicContentCounts> {
  const response = await apiGet<PublicContentCounts>("/stats/count");
  return response.data;
}
