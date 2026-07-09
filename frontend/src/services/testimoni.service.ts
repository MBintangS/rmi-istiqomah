import { apiGet } from "@/lib/api";
import type { TestimoniListItem } from "@/types/api";

export async function fetchTestimoniList(): Promise<TestimoniListItem[]> {
  const response = await apiGet<TestimoniListItem[]>("/testimoni");
  return response.data;
}
