import "server-only";
import { unstable_cache } from "next/cache";
import { EQuran, EQuranApiError, type AudioMap, type Surat, type SuratDetail } from "equran";
import { AppError } from "@/server/errors";

const CACHE_SECONDS = 60 * 60 * 24;

export type QuranRevelationPlace = "Mekah" | "Madinah";

export interface QuranQari {
  id: string;
  name: string;
}

export interface QuranSuratSummary {
  number: number;
  nameArabic: string;
  nameLatin: string;
  verseCount: number;
  revelationPlace: QuranRevelationPlace;
  meaning: string;
}

export interface QuranAyat {
  number: number;
  arabic: string;
  latin: string;
  translation: string;
  audio: Record<string, string>;
}

export interface QuranSuratNeighbor {
  number: number;
  nameLatin: string;
}

export interface QuranSuratDetail extends QuranSuratSummary {
  audioFull: Record<string, string>;
  verses: QuranAyat[];
  previous: QuranSuratNeighbor | null;
  next: QuranSuratNeighbor | null;
}

export interface QuranCatalog {
  source: "equran";
  qari: QuranQari[];
  items: QuranSuratSummary[];
}

function getClient() {
  return new EQuran({
    baseUrl: process.env.EQURAN_BASE_URL?.replace(/\/$/, "") || "https://equran.id/api/v2",
    timeout: 30_000,
    cache: {
      enabled: true,
      ttl: CACHE_SECONDS * 1000,
      maxSize: 200,
    },
  });
}

function mapAudio(audio: AudioMap): Record<string, string> {
  return {
    "01": audio["01"],
    "02": audio["02"],
    "03": audio["03"],
    "04": audio["04"],
    "05": audio["05"],
    "06": audio["06"],
  };
}

function mapSummary(surat: Surat): QuranSuratSummary {
  return {
    number: surat.nomor,
    nameArabic: surat.nama,
    nameLatin: surat.namaLatin,
    verseCount: surat.jumlahAyat,
    revelationPlace: surat.tempatTurun,
    meaning: surat.arti,
  };
}

function mapNeighbor(
  value: SuratDetail["suratSelanjutnya"],
): QuranSuratNeighbor | null {
  if (!value) return null;
  return { number: value.nomor, nameLatin: value.namaLatin };
}

function mapDetail(surat: SuratDetail): QuranSuratDetail {
  return {
    ...mapSummary(surat),
    audioFull: mapAudio(surat.audioFull),
    verses: surat.ayat.map((ayat) => ({
      number: ayat.nomorAyat,
      arabic: ayat.teksArab,
      latin: ayat.teksLatin,
      translation: ayat.teksIndonesia,
      audio: mapAudio(ayat.audio),
    })),
    previous: mapNeighbor(surat.suratSebelumnya),
    next: mapNeighbor(surat.suratSelanjutnya),
  };
}

function mapUpstreamError(error: unknown, fallback: string): never {
  if (error instanceof EQuranApiError) {
    const status = error.statusCode === 404 ? 404 : error.statusCode === 429 ? 429 : 502;
    throw new AppError(
      status,
      status === 404 ? "NOT_FOUND" : status === 429 ? "RATE_LIMITED" : "UPSTREAM_ERROR",
      error.message || fallback,
    );
  }
  throw new AppError(502, "UPSTREAM_ERROR", fallback);
}

const getCachedList = unstable_cache(
  async () => getClient().getAllSurat(),
  ["quran-equran-list"],
  { revalidate: CACHE_SECONDS },
);

const getCachedSurat = unstable_cache(
  async (nomor: number) => getClient().getSurat(nomor),
  ["quran-equran-surat"],
  { revalidate: CACHE_SECONDS },
);

export function getQuranQari(): QuranQari[] {
  return getClient()
    .getQariList()
    .map((item) => ({ id: item.id, name: item.name }));
}

export async function getQuranCatalog(): Promise<QuranCatalog> {
  try {
    const items = await getCachedList();
    return {
      source: "equran",
      qari: getQuranQari(),
      items: items.map(mapSummary),
    };
  } catch (error) {
    mapUpstreamError(error, "Daftar surat tidak tersedia");
  }
}

export async function getQuranSurat(nomor: number): Promise<QuranSuratDetail> {
  if (!Number.isInteger(nomor) || nomor < 1 || nomor > 114) {
    throw new AppError(400, "VALIDATION_ERROR", "Nomor surat harus 1–114");
  }

  try {
    const surat = await getCachedSurat(nomor);
    return mapDetail(surat);
  } catch (error) {
    mapUpstreamError(error, "Surat tidak tersedia");
  }
}
