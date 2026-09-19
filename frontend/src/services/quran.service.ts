import { apiGet } from "@/lib/api";
import type { QuranCatalog, QuranSuratDetail } from "@/types/api";

export async function fetchQuranCatalog(): Promise<QuranCatalog> {
  const response = await apiGet<QuranCatalog>("/quran/surat");
  return response.data;
}

export async function fetchQuranSurat(nomor: number): Promise<QuranSuratDetail> {
  const response = await apiGet<QuranSuratDetail>(`/quran/surat/${nomor}`);
  return response.data;
}
