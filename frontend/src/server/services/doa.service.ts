import "server-only";
import { unstable_cache } from "next/cache";
import { AppError } from "@/server/errors";
import type { DoaListQuery } from "@/server/schemas/doa.schema";

const DEFAULT_DOA_URL = "https://equran.id/api/doa";
const CACHE_SECONDS = 60 * 60 * 24;

export interface DoaItem {
  id: number;
  group: string;
  name: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
  tags: string[];
}

export interface DoaCatalog {
  source: "equran";
  total: number;
  groups: string[];
  tags: string[];
  items: DoaItem[];
}

interface EquranDoaItem {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag?: string[];
}

interface EquranDoaListResponse {
  status: string;
  total?: number;
  data: EquranDoaItem[] | EquranDoaItem | null;
}

function doaUrl() {
  return process.env.EQURAN_DOA_URL?.replace(/\/$/, "") || DEFAULT_DOA_URL;
}

function mapItem(item: EquranDoaItem): DoaItem {
  return {
    id: item.id,
    group: item.grup,
    name: item.nama,
    arabic: item.ar,
    latin: item.tr,
    translation: item.idn,
    source: item.tentang?.trim() ?? "",
    tags: Array.isArray(item.tag) ? item.tag : [],
  };
}

function matchesQuery(item: DoaItem, query: DoaListQuery): boolean {
  if (query.grup && item.group !== query.grup) return false;
  if (query.tag && !item.tags.includes(query.tag)) return false;
  if (query.q) {
    const haystack = `${item.name} ${item.group} ${item.latin} ${item.translation} ${item.tags.join(" ")}`.toLowerCase();
    if (!haystack.includes(query.q.toLowerCase())) return false;
  }
  return true;
}

async function fetchDoaCatalogFromEquran(): Promise<DoaItem[]> {
  const response = await fetch(doaUrl(), {
    headers: { Accept: "application/json" },
  });

  let payload: EquranDoaListResponse | null = null;
  try {
    payload = (await response.json()) as EquranDoaListResponse;
  } catch {
    throw new AppError(502, "UPSTREAM_ERROR", "Gagal membaca daftar doa");
  }

  if (!response.ok || payload.status !== "success" || !Array.isArray(payload.data)) {
    throw new AppError(
      response.status === 429 ? 429 : 502,
      response.status === 429 ? "RATE_LIMITED" : "UPSTREAM_ERROR",
      "Daftar doa tidak tersedia",
    );
  }

  return payload.data.map(mapItem);
}

const getCachedItems = unstable_cache(
  async () => fetchDoaCatalogFromEquran(),
  ["doa-equran"],
  { revalidate: CACHE_SECONDS },
);

export async function getDoaCatalog(query: DoaListQuery = {}): Promise<DoaCatalog> {
  const items = await getCachedItems();
  const groups = Array.from(new Set(items.map((item) => item.group))).sort((a, b) =>
    a.localeCompare(b, "id"),
  );
  const tags = Array.from(new Set(items.flatMap((item) => item.tags))).sort((a, b) =>
    a.localeCompare(b, "id"),
  );
  const filtered = items.filter((item) => matchesQuery(item, query));

  return {
    source: "equran",
    total: filtered.length,
    groups,
    tags,
    items: filtered,
  };
}

export async function getDoaById(id: number): Promise<DoaItem> {
  const items = await getCachedItems();
  const item = items.find((entry) => entry.id === id);
  if (!item) {
    throw new AppError(404, "NOT_FOUND", "Doa tidak ditemukan");
  }
  return item;
}
