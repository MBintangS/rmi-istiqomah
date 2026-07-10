import { apiGet, apiPut } from "@/lib/api";
import type { SettingsData, SettingsWritePayload } from "@/types/api";

export async function fetchSettings(): Promise<SettingsData> {
  const response = await apiGet<SettingsData>("/settings");
  return response.data;
}

export async function updateSettings(payload: SettingsWritePayload) {
  return apiPut<SettingsData>("/settings", payload);
}
