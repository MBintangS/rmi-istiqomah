"use client";

import { useMemo, useState } from "react";
import { Badge, EmptyState, FilterBar, Input, Select, SkeletonList } from "@/components/ui";
import { useDokumen } from "@/hooks/useDokumen";
import { getApiErrorMessage } from "@/lib/api";
import { formatFileSize } from "@/lib/format-file-size";
import { mapDokumenListItem } from "@/lib/mappers/dokumen";

export function DokumenPageContent() {
  const { data, isLoading, isError, error, refetch } = useDokumen({ limit: 50 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const documents = useMemo(
    () => (data?.items ?? []).map(mapDokumenListItem),
    [data?.items],
  );

  const categories = useMemo(() => {
    const unique = new Set(documents.map((doc) => doc.category).filter(Boolean));
    return Array.from(unique).sort();
  }, [documents]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesCategory = !category || doc.category === category;
      const matchesSearch =
        !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [documents, search, category]);

  if (isLoading) {
    return <SkeletonList count={4} className="lg:grid-cols-1" />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat dokumen"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        title="Belum ada dokumen"
        description="Dokumen publik RMI akan tampil di sini setelah diunggah."
      />
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar>
        <Input
          type="search"
          placeholder="Cari dokumen..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:flex-1"
          aria-label="Cari dokumen"
        />
        {categories.length > 0 ? (
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="sm:w-56"
            aria-label="Filter kategori dokumen"
          >
            <option value="">Semua kategori</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        ) : null}
      </FilterBar>

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada dokumen"
          description="Tidak ada dokumen yang cocok dengan pencarian atau filter."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((doc) => (
            <li key={doc.id}>
              <article className="flex flex-col gap-4 rounded-rmi border border-foreground/10 bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 gap-4">
                  <span
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-rmi bg-primary/10 font-display text-xs font-bold text-primary sm:flex"
                    aria-hidden="true"
                  >
                    {doc.fileType.toUpperCase().slice(0, 4)}
                  </span>
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-heading">{doc.name}</h2>
                      <Badge variant="category">{doc.category}</Badge>
                    </div>
                    {doc.description ? (
                      <p className="text-body text-foreground/80">{doc.description}</p>
                    ) : null}
                    <p className="text-caption text-foreground/70">{formatFileSize(doc.fileSize)}</p>
                  </div>
                </div>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary bg-transparent px-5 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Unduh
                </a>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
