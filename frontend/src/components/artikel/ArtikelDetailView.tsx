"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/home/ArticleCard";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { Badge, EmptyState, RichTextContent } from "@/components/ui";
import { PageHero } from "@/components/layout/PageHero";
import { ArtikelDetailSkeleton } from "@/components/artikel/ArtikelDetailSkeleton";
import { useArticle, useArticles } from "@/hooks";
import { getApiErrorMessage } from "@/lib/api";
import { formatArticleDate } from "@/lib/format-date";
import {
  getRelatedArticles,
  mapArtikelDetail,
  mapArtikelListItem,
} from "@/lib/mappers/artikel";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface ArtikelDetailViewProps {
  slug: string;
}

export function ArtikelDetailView({ slug }: ArtikelDetailViewProps) {
  const { data, isLoading, isError, error, refetch } = useArticle(slug);
  const { data: listData } = useArticles({ limit: 50 });

  if (isLoading) {
    return <ArtikelDetailSkeleton />;
  }

  if (isError) {
    const message = getApiErrorMessage(error);
    const isNotFound = message.toLowerCase().includes("tidak ditemukan");

    if (isNotFound) {
      notFound();
    }

    return (
      <EmptyState
        title="Gagal memuat artikel"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  const article = mapArtikelDetail(data);
  const allArticles = (listData?.items ?? []).map(mapArtikelListItem);
  const relatedArticles = getRelatedArticles(allArticles, article, 3);
  const articlePath = `/artikel/${article.slug}`;
  const [relatedFeatured, ...relatedRest] = relatedArticles;

  return (
    <>
      <PageHero
        variant="detail"
        title={article.title}
        description={`Oleh ${article.author}`}
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Artikel Islami", href: "/artikel" },
          { label: article.title },
        ]}
        meta={
          <>
            <Badge variant="category">{article.category.name}</Badge>
            <time className="text-caption text-foreground/60" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </>
        }
      />

      <article className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-[68ch] px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-rmi">
            <Image
              src={article.thumbnail || PLACEHOLDER_IMAGE}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 680px"
              priority
            />
          </div>

          <RichTextContent html={article.content} />

          <ShareButtons
            title={article.title}
            path={articlePath}
            className="mt-10 border-t border-foreground/10 pt-6"
          />
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-surface py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl">Artikel Terkait</h2>
            <div className="grid gap-8 lg:grid-cols-12">
              {relatedFeatured ? (
                <div className="lg:col-span-7">
                  <ArticleCard article={relatedFeatured} variant="featured" />
                </div>
              ) : null}
              {relatedRest.length > 0 ? (
                <div className="lg:col-span-5">
                  {relatedRest.map((related) => (
                    <ArticleCard key={related.id} article={related} variant="list" />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
