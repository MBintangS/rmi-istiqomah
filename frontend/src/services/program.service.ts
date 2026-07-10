import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type { ProgramDetail, ProgramListItem, ProgramWritePayload } from "@/types/api";

export async function fetchProgramList(): Promise<ProgramListItem[]> {
  const response = await apiGet<ProgramListItem[]>("/program");
  return response.data;
}

export async function fetchProgramBySlug(slug: string): Promise<ProgramDetail> {
  const response = await apiGet<ProgramDetail>(`/program/${slug}`);
  return response.data;
}

export async function createProgram(payload: ProgramWritePayload) {
  return apiPost<ProgramDetail>("/program", payload);
}

export async function updateProgram(id: string, payload: Partial<ProgramWritePayload>) {
  return apiPut<ProgramDetail>(`/program/${id}`, payload);
}

export async function deleteProgram(id: string) {
  return apiDelete<{ id: string }>(`/program/${id}`);
}
