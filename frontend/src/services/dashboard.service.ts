import { apiGet } from "@/lib/api";
import type { DashboardAnalytics, DashboardStats } from "@/types/api";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await apiGet<DashboardStats>("/dashboard/stats");
  return response.data;
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  const response = await apiGet<DashboardAnalytics>("/dashboard/analytics");
  return response.data;
}
