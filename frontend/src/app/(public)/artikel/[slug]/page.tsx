import type { Metadata } from "next";
import { ArtikelDetailView } from "@/components/artikel/ArtikelDetailView";
import { fetchArtikelBySlug } from "@/services/artikel.service";
import { buildPageMetadata } from "@/lib/seo";

interface ArtikelDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArtikelDetailPageProps): Promise<Metadata> {
  try {
    const article = await fetchArtikelBySlug(params.slug);

    return buildPageMetadata({
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt,
      path: `/artikel/${article.slug}`,
      image: article.thumbnail || undefined,
      type: "article",
    });
  } catch {
    return buildPageMetadata({
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak ditemukan.",
      path: `/artikel/${params.slug}`,
      noIndex: true,
    });
  }
}

export default function ArtikelDetailPage({ params }: ArtikelDetailPageProps) {
  return <ArtikelDetailView slug={params.slug} />;
}
