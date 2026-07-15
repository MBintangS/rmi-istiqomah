"use client";

import { useRef, useState } from "react";
import { EventCard } from "@/components/home/EventCard";
import { EmptyState, Input, Pagination, Select } from "@/components/ui";
import type { Kegiatan, Kategori } from "@/types";
import { cn } from "@/lib/utils";

type KegiatanViewMode = "grid" | "list";

interface EventListProps {
  events: Kegiatan[];
  categories: Kategori[];
  search: string;
  onSearchChange: (value: string) => void;
  categorySlug: string;
  onCategoryChange: (slug: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** True when filters applied but no results */
  isFilteredEmpty?: boolean;
}

function GridViewIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListViewIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

export function EventList({
  events,
  categories,
  search,
  onSearchChange,
  categorySlug,
  onCategoryChange,
  currentPage,
  totalPages,
  onPageChange,
  isFilteredEmpty = false,
}: EventListProps) {
  const [viewMode, setViewMode] = useState<KegiatanViewMode>("grid");
  const filtersRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (nextPage: number) => {
    if (nextPage === currentPage || nextPage < 1 || nextPage > totalPages) {
      return;
    }

    onPageChange(nextPage);

    // Blur tombol paginasi agar browser tidak menarik viewport kembali ke bawah
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    requestAnimationFrame(() => {
      const el = filtersRef.current;
      if (!el) return;

      const headerOffset = 96; // sejajar scroll-mt-24 + navbar sticky
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior });
    });
  };

  return (
    <div className="space-y-8">
      <div
        ref={filtersRef}
        className="flex scroll-mt-24 flex-col gap-4 sm:flex-row sm:items-center"
      >
        <Input
          type="search"
          placeholder="Cari nama kegiatan..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="sm:flex-1"
          aria-label="Cari kegiatan"
        />

        <Select
          value={categorySlug}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="sm:w-56"
          aria-label="Filter kategori"
        >
          <option value="">Semua kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>

        <div
          className="inline-flex shrink-0 self-end rounded-rmi border border-foreground/10 bg-surface p-1 sm:self-auto"
          role="group"
          aria-label="Mode tampilan"
        >
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            aria-label="Tampilan grid"
            title="Grid"
            className={cn(
              "rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-foreground/55 hover:bg-primary/10 hover:text-primary",
            )}
          >
            <GridViewIcon />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            aria-label="Tampilan list"
            title="List"
            className={cn(
              "rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-foreground/55 hover:bg-primary/10 hover:text-primary",
            )}
          >
            <ListViewIcon />
          </button>
        </div>
      </div>

      {events.length > 0 ? (
        <div
          className={cn(
            "grid gap-4",
            viewMode === "grid" ? "lg:grid-cols-2" : "grid-cols-1",
          )}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} variant={viewMode} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={isFilteredEmpty ? "Tidak ada kegiatan ditemukan" : "Belum ada kegiatan"}
          description={
            isFilteredEmpty
              ? "Tidak ada kegiatan yang cocok dengan pencarian atau filter."
              : "Kegiatan RMI akan tampil di sini setelah dipublikasikan."
          }
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
