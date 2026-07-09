import { apiGet } from "@/lib/api";
import type { ProgramDetail, ProgramListItem } from "@/types/api";

export async function fetchProgramList(): Promise<ProgramListItem[]> {
  const response = await apiGet<ProgramListItem[]>("/program");
  return response.data;
}

export async function fetchProgramBySlug(slug: string): Promise<ProgramDetail> {
  const response = await apiGet<ProgramDetail>(`/program/${slug}`);
  return response.data;
}
