"use client";

import { ArticleList } from "@/components/articles/ArticleList";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useArticles } from "@/hooks/useArticles";
import { getApiErrorMessage } from "@/lib/api";
import {
  getArticleCategoriesFromList,
  mapArtikelListItem,
} from "@/lib/mappers/artikel";

export function ArtikelPageContent() {
  const { data, isLoading, isError, error, refetch } = useArticles({ limit: 50, sort: "-createdAt" });

  if (isLoading) {
    return <SkeletonList count={6} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat artikel"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const articles = (data?.items ?? []).map(mapArtikelListItem);

  if (articles.length === 0) {
    return (
      <EmptyState
        title="Belum ada artikel"
        description="Artikel akan tampil di sini setelah dipublikasikan dari CMS."
      />
    );
  }

  const categories = getArticleCategoriesFromList(articles);

  return <ArticleList articles={articles} categories={categories} />;
}
