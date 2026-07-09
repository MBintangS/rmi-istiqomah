import { apiGet } from "@/lib/api";
import type { PengurusListItem } from "@/types/api";

export async function fetchPengurusList(): Promise<PengurusListItem[]> {
  const response = await apiGet<PengurusListItem[]>("/pengurus");
  return response.data;
}
