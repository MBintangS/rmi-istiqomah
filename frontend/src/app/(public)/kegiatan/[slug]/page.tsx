import type { Metadata } from "next";
import { KegiatanDetailView } from "@/components/kegiatan/KegiatanDetailView";
import { fetchKegiatanBySlug } from "@/services/kegiatan.service";
import { buildPageMetadata } from "@/lib/seo";

interface KegiatanDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: KegiatanDetailPageProps): Promise<Metadata> {
  try {
    const event = await fetchKegiatanBySlug(params.slug);

    return buildPageMetadata({
      title: event.title,
      description: event.description,
      path: `/kegiatan/${event.slug}`,
      image: event.thumbnail || undefined,
    });
  } catch {
    return buildPageMetadata({
      title: "Kegiatan Tidak Ditemukan",
      description: "Kegiatan yang Anda cari tidak ditemukan.",
      path: `/kegiatan/${params.slug}`,
      noIndex: true,
    });
  }
}

export default function KegiatanDetailPage({ params }: KegiatanDetailPageProps) {
  return <KegiatanDetailView slug={params.slug} />;
}
