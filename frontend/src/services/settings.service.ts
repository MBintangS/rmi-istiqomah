import { apiGet } from "@/lib/api";
import type { SettingsData } from "@/types/api";

export async function fetchSettings(): Promise<SettingsData> {
  const response = await apiGet<SettingsData>("/settings");
  return response.data;
}
