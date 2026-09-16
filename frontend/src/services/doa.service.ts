import { apiGet } from "@/lib/api";
import type { DoaCatalog, DoaItem } from "@/types/api";

export async function fetchDoaCatalog(): Promise<DoaCatalog> {
  const response = await apiGet<DoaCatalog>("/doa");
  return response.data;
}

export async function fetchDoaById(id: number): Promise<DoaItem> {
  const response = await apiGet<DoaItem>(`/doa/${id}`);
  return response.data;
}
