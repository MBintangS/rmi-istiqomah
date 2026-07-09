"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "@/components/home/ArticleCard";
import { EmptyState, Input, Pagination, Select } from "@/components/ui";
import type { Artikel, Kategori } from "@/types";

const PAGE_SIZE = 3;

interface ArticleListProps {
  articles: Artikel[];
  categories: Kategori[];
}

export function ArticleList({ articles, categories }: ArticleListProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = !categoryId || article.category.id === categoryId;
      const matchesSearch = !query || article.title.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, categoryId, search]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedArticles = filteredArticles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryId]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="search"
          placeholder="Cari judul artikel..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:flex-1"
          aria-label="Cari artikel"
        />

        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="sm:w-56"
          aria-label="Filter kategori"
        >
          <option value="">Semua kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      {paginatedArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Tidak ada artikel"
          description="Tidak ada artikel yang cocok dengan pencarian atau filter."
          className="border border-dashed border-foreground/20 bg-transparent shadow-none"
        />
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
