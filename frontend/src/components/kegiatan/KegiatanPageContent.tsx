"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EventList } from "@/components/events/EventList";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useKegiatan } from "@/hooks/useKegiatan";
import { useKategori } from "@/hooks/useKategori";
import { getApiErrorMessage } from "@/lib/api";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";
import type { Kategori } from "@/types";

const PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 350;

export function KegiatanPageContent() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const skipSearchPageReset = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (skipSearchPageReset.current) {
      skipSearchPageReset.current = false;
      return;
    }
    setPage(1);
  }, [search]);

  const listParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      category: categorySlug || undefined,
      sort: "-dateStart",
    }),
    [page, search, categorySlug],
  );

  const {
    data,
    isLoading: kegiatanLoading,
    isFetching,
    isError: kegiatanError,
    error: kegiatanErr,
    refetch: refetchKegiatan,
  } = useKegiatan(listParams);

  const {
    data: kategoriData,
    isLoading: kategoriLoading,
    isError: kategoriError,
    error: kategoriErr,
    refetch: refetchKategori,
  } = useKategori("kegiatan");

  const isInitialLoading = (kegiatanLoading || kategoriLoading) && !data;

  if (isInitialLoading) {
    return <SkeletonList count={4} />;
  }

  if (kegiatanError) {
    return (
      <EmptyState
        title="Gagal memuat kegiatan"
        description={getApiErrorMessage(
          kegiatanErr,
          "Periksa koneksi dan pastikan backend API berjalan.",
        )}
        actionLabel="Coba lagi"
        onAction={() => refetchKegiatan()}
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

  const events = (data?.items ?? []).map(mapKegiatanListItem);
  const totalPages = data?.pagination?.totalPages ?? 1;
  const total = data?.pagination?.total ?? events.length;
  const hasFilters = Boolean(search || categorySlug);
  const isFilteredEmpty = hasFilters && total === 0;

  const categories: Kategori[] = (kategoriData ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    type: item.type,
  }));

  return (
    <div className={isFetching ? "opacity-70 transition-opacity" : undefined}>
      <EventList
        events={events}
        categories={categories}
        search={searchInput}
        onSearchChange={setSearchInput}
        categorySlug={categorySlug}
        onCategoryChange={(slug) => {
          setPage(1);
          setCategorySlug(slug);
        }}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isFilteredEmpty={isFilteredEmpty}
      />
    </div>
  );
}
