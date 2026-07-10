import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { fetchArtikelList } from "@/services/artikel.service";
import { fetchKegiatanList } from "@/services/kegiatan.service";
import { fetchProgramList } from "@/services/program.service";

export const revalidate = 3600;

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/tentang-kami", changeFrequency: "monthly", priority: 0.8 },
  { path: "/program", changeFrequency: "weekly", priority: 0.9 },
  { path: "/kegiatan", changeFrequency: "daily", priority: 0.9 },
  { path: "/artikel", changeFrequency: "daily", priority: 0.9 },
  { path: "/galeri", changeFrequency: "weekly", priority: 0.7 },
  { path: "/dokumen", changeFrequency: "monthly", priority: 0.6 },
  { path: "/donasi", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontak", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [artikelResult, kegiatanResult, programResult] = await Promise.allSettled([
    fetchArtikelList({ limit: 100, sort: "-publishedAt" }),
    fetchKegiatanList({ limit: 100, sort: "-dateStart" }),
    fetchProgramList(),
  ]);

  const artikelEntries: MetadataRoute.Sitemap =
    artikelResult.status === "fulfilled"
      ? artikelResult.value.items.map((item) => ({
          url: `${SITE_URL}/artikel/${item.slug}`,
          lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

  const kegiatanEntries: MetadataRoute.Sitemap =
    kegiatanResult.status === "fulfilled"
      ? kegiatanResult.value.items.map((item) => ({
          url: `${SITE_URL}/kegiatan/${item.slug}`,
          lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

  const programEntries: MetadataRoute.Sitemap =
    programResult.status === "fulfilled"
      ? programResult.value.map((item) => ({
          url: `${SITE_URL}/program/${item.slug}`,
          lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
          changeFrequency: "monthly",
          priority: 0.7,
        }))
      : [];

  return [...staticEntries, ...artikelEntries, ...kegiatanEntries, ...programEntries];
}
