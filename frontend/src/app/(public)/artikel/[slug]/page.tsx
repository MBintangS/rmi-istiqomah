import type { Metadata } from "next";
import { ArtikelDetailView } from "@/components/artikel/ArtikelDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchArtikelBySlug } from "@/services/artikel.service";
import { articleJsonLd, buildPageMetadata } from "@/lib/seo";

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

export default async function ArtikelDetailPage({ params }: ArtikelDetailPageProps) {
  let structuredData: ReturnType<typeof articleJsonLd> | null = null;

  try {
    const article = await fetchArtikelBySlug(params.slug);
    structuredData = articleJsonLd({
      title: article.title,
      excerpt: article.excerpt,
      slug: article.slug,
      publishedAt: article.publishedAt ?? article.createdAt,
      thumbnail: article.thumbnail,
      author: article.author?.name ?? null,
    });
  } catch {
    structuredData = null;
  }

  return (
    <>
      {structuredData ? <JsonLd data={structuredData} /> : null}
      <ArtikelDetailView slug={params.slug} />
    </>
  );
}
