"use client";

import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { ArticleCard } from "@/components/home/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { getApiErrorMessage } from "@/lib/api";
import { mapArtikelListItem } from "@/lib/mappers/artikel";

export function LatestArticlesSection() {
  const { data, isPending, isError, error } = useArticles({
    limit: 4,
    sort: "-publishedAt",
    status: "published",
  });

  const articles = (data?.items ?? []).map(mapArtikelListItem);
  const [featured, ...rest] = articles;

  return (
    <MotionSection tone="slide" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2>Artikel Islami RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Bacaan ringan seputar dakwah, tips ibadah, dan kajian untuk remaja muslim.
          </p>
          <div className="mt-6">
            <Button href="/artikel" variant="outline" size="sm">
              Semua Artikel
            </Button>
          </div>
        </div>

        {isPending ? (
          <SkeletonList count={4} />
        ) : isError ? (
          <EmptyState
            title="Gagal memuat artikel"
            description={getApiErrorMessage(error)}
          />
        ) : articles.length === 0 ? (
          <EmptyState
            title="Belum ada artikel"
            description="Artikel akan tampil di sini setelah dipublikasikan."
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {featured && (
              <div className="lg:col-span-7">
                <ArticleCard article={featured} variant="featured" />
              </div>
            )}
            <div className="space-y-1 lg:col-span-5">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} variant="list" />
              ))}
            </div>
          </div>
        )}
      </div>
    </MotionSection>
  );
}
