import { apiGet } from "@/lib/api";
import type { HealthData } from "@/types/api";

export async function fetchHealth(): Promise<HealthData> {
  const response = await apiGet<HealthData>("/health");
  return response.data;
}
