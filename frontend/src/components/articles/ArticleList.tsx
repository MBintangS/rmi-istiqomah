"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArticleCard } from "@/components/home/ArticleCard";
import { EmptyState, FilterBar, Input, Pagination, Select } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/lib/motion";
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
  const filtersRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

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

  const [featured, ...rest] = paginatedArticles;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryId]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      const el = filtersRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  };

  return (
    <div className="space-y-8">
      <FilterBar ref={filtersRef} className="scroll-mt-24">
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
      </FilterBar>

      {paginatedArticles.length > 0 ? (
        <motion.div
          className="space-y-6"
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={reduce ? undefined : staggerContainer}
        >
          {featured ? (
            <motion.div variants={reduce ? undefined : staggerItem}>
              <ArticleCard article={featured} variant="featured" />
            </motion.div>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((article) => (
                <motion.div key={article.id} variants={reduce ? undefined : staggerItem}>
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.div>
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
        onPageChange={handlePageChange}
      />
    </div>
  );
}
