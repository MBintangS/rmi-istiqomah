import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { TestimoniListItem, TestimoniWritePayload } from "@/types/api";

export async function fetchTestimoniList(): Promise<TestimoniListItem[]> {
  const response = await apiGet<TestimoniListItem[]>("/testimoni");
  return response.data;
}

export async function createTestimoni(payload: TestimoniWritePayload) {
  return apiPost<TestimoniListItem>("/testimoni", payload);
}

export async function updateTestimoni(id: string, payload: Partial<TestimoniWritePayload>) {
  return apiPut<TestimoniListItem>(`/testimoni/${id}`, payload);
}

export async function deleteTestimoni(id: string) {
  return apiDelete<{ id: string }>(`/testimoni/${id}`);
}
