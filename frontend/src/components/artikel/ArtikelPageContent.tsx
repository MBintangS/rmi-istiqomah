"use client";

import { ArticleList } from "@/components/articles/ArticleList";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useArticles } from "@/hooks/useArticles";
import { useKategori } from "@/hooks/useKategori";
import { getApiErrorMessage } from "@/lib/api";
import { mapArtikelListItem } from "@/lib/mappers/artikel";
import type { Kategori } from "@/types";

export function ArtikelPageContent() {
  const {
    data,
    isLoading: articlesLoading,
    isError: articlesError,
    error: articlesErr,
    refetch: refetchArticles,
  } = useArticles({ limit: 50, sort: "-createdAt" });
  const {
    data: kategoriData,
    isLoading: kategoriLoading,
    isError: kategoriError,
    error: kategoriErr,
    refetch: refetchKategori,
  } = useKategori("artikel");

  const isLoading = articlesLoading || kategoriLoading;

  if (isLoading) {
    return <SkeletonList count={6} />;
  }

  if (articlesError) {
    return (
      <EmptyState
        title="Gagal memuat artikel"
        description={getApiErrorMessage(
          articlesErr,
          "Periksa koneksi dan pastikan backend API berjalan.",
        )}
        actionLabel="Coba lagi"
        onAction={() => refetchArticles()}
      />
    );
  }

  if (kategoriError) {
    return (
      <EmptyState
        title="Gagal memuat kategori"
        description={getApiErrorMessage(kategoriErr)}
        actionLabel="Coba lagi"
        onAction={() => refetchKategori()}
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

  const categories: Kategori[] = (kategoriData ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    type: item.type,
  }));

  return <ArticleList articles={articles} categories={categories} />;
}
