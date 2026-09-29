import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  PendaftaranItem,
  PendaftaranWritePayload,
  PesertaItem,
  PesertaWritePayload,
} from "@/types/api";

export async function fetchOpenPendaftaran(program?: string): Promise<PendaftaranItem[]> {
  const response = await apiGet<PendaftaranItem[]>("/pendaftaran", program ? { program } : undefined);
  return response.data;
}

export async function submitPeserta(slug: string, payload: PesertaWritePayload) {
  return apiPost<{ id: string }>(`/pendaftaran/${slug}`, payload);
}

export async function fetchAdminPendaftaran(): Promise<PendaftaranItem[]> {
  const response = await apiGet<PendaftaranItem[]>("/pendaftaran/admin");
  return response.data;
}

export async function fetchAdminPendaftaranById(id: string): Promise<PendaftaranItem> {
  const response = await apiGet<PendaftaranItem>(`/pendaftaran/admin/${id}`);
  return response.data;
}

export async function createPendaftaran(payload: PendaftaranWritePayload) {
  return apiPost<PendaftaranItem>("/pendaftaran/admin", payload);
}

export async function updatePendaftaran(id: string, payload: Partial<PendaftaranWritePayload>) {
  return apiPut<PendaftaranItem>(`/pendaftaran/admin/${id}`, payload);
}

export async function deletePendaftaran(id: string) {
  return apiDelete<{ id: string }>(`/pendaftaran/admin/${id}`);
}

export async function fetchPeserta(id: string): Promise<PesertaItem[]> {
  const response = await apiGet<PesertaItem[]>(`/pendaftaran/admin/${id}/peserta`);
  return response.data;
}
