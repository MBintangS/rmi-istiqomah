import { apiGet } from "@/lib/api";
import type { DashboardStats } from "@/types/api";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await apiGet<DashboardStats>("/dashboard/stats");
  return response.data;
}
