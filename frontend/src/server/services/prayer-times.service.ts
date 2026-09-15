import "server-only";
import { unstable_cache } from "next/cache";
import { AppError } from "@/server/errors";
import type { PrayerTimesQuery } from "@/server/schemas/prayerTimes.schema";

const DEFAULT_PROVINSI = "Jawa Barat";
const DEFAULT_KABKOTA = "Kota Bogor";
const DEFAULT_BASE_URL = "https://equran.id/api/v2";
const CACHE_SECONDS = 60 * 60;

export interface PrayerTimesDay {
  date: string;
  day: number;
  weekday: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface PrayerTimesResult {
  source: "equran";
  provinsi: string;
  kabkota: string;
  month: number;
  year: number;
  monthName: string;
  date: string;
  times: PrayerTimesDay;
  days?: PrayerTimesDay[];
}

interface EquranScheduleItem {
  tanggal: number;
  tanggal_lengkap: string;
  hari: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

interface EquranMonthPayload {
  provinsi: string;
  kabkota: string;
  bulan: number;
  tahun: number;
  bulan_nama: string;
  jadwal: EquranScheduleItem[];
}

interface EquranResponse {
  code: number;
  message: string;
  data: EquranMonthPayload | null;
}

function locationConfig() {
  return {
    baseUrl: process.env.EQURAN_BASE_URL?.replace(/\/$/, "") ?? DEFAULT_BASE_URL,
    provinsi: process.env.PRAYER_TIMES_PROVINSI?.trim() || DEFAULT_PROVINSI,
    kabkota: process.env.PRAYER_TIMES_KABKOTA?.trim() || DEFAULT_KABKOTA,
  };
}

function todayInWib(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
}

function mapDay(item: EquranScheduleItem): PrayerTimesDay {
  return {
    date: item.tanggal_lengkap,
    day: item.tanggal,
    weekday: item.hari,
    imsak: item.imsak,
    subuh: item.subuh,
    terbit: item.terbit,
    dhuha: item.dhuha,
    dzuhur: item.dzuhur,
    ashar: item.ashar,
    maghrib: item.maghrib,
    isya: item.isya,
  };
}

async function fetchMonthFromEquran(
  year: number,
  month: number,
  provinsi: string,
  kabkota: string,
): Promise<EquranMonthPayload> {
  const { baseUrl } = locationConfig();
  const response = await fetch(`${baseUrl}/shalat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provinsi,
      kabkota,
      bulan: month,
      tahun: year,
    }),
  });

  let payload: EquranResponse | null = null;
  try {
    payload = (await response.json()) as EquranResponse;
  } catch {
    throw new AppError(502, "UPSTREAM_ERROR", "Gagal membaca jadwal sholat");
  }

  if (!response.ok || payload.code !== 200 || !payload.data?.jadwal?.length) {
    throw new AppError(
      response.status === 429 ? 429 : 502,
      response.status === 429 ? "RATE_LIMITED" : "UPSTREAM_ERROR",
      payload.message || "Jadwal sholat tidak tersedia",
    );
  }

  return payload.data;
}

const getCachedMonth = unstable_cache(
  async (year: number, month: number, provinsi: string, kabkota: string) =>
    fetchMonthFromEquran(year, month, provinsi, kabkota),
  ["prayer-times-equran"],
  { revalidate: CACHE_SECONDS },
);

export async function getPrayerTimes(query: PrayerTimesQuery): Promise<PrayerTimesResult> {
  const date = query.date ?? todayInWib();
  const [year, month] = date.split("-").map(Number);
  const { provinsi, kabkota } = locationConfig();
  const monthPayload = await getCachedMonth(year, month, provinsi, kabkota);
  const days = monthPayload.jadwal.map(mapDay);
  const times = days.find((item) => item.date === date);

  if (!times) {
    throw new AppError(404, "NOT_FOUND", "Jadwal sholat untuk tanggal tersebut tidak ditemukan");
  }

  return {
    source: "equran",
    provinsi: monthPayload.provinsi,
    kabkota: monthPayload.kabkota,
    month: monthPayload.bulan,
    year: monthPayload.tahun,
    monthName: monthPayload.bulan_nama,
    date,
    times,
    ...(query.scope === "month" ? { days } : {}),
  };
}
