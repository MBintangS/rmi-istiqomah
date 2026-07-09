"use client";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useGaleri } from "@/hooks/useGaleri";
import { getApiErrorMessage } from "@/lib/api";
import {
  flattenGaleriItems,
  getGalleryCategoriesFromItems,
  getGalleryEventFiltersFromItems,
} from "@/lib/mappers/galeri";

export function GaleriPageContent() {
  const { data, isLoading, isError, error, refetch } = useGaleri({ limit: 100, sort: "order" });

  if (isLoading) {
    return <SkeletonList count={8} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat galeri"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const items = flattenGaleriItems(data?.items ?? []);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Belum ada foto"
        description="Dokumentasi kegiatan RMI akan tampil di sini setelah diunggah."
      />
    );
  }

  const categories = getGalleryCategoriesFromItems(items);
  const events = getGalleryEventFiltersFromItems(items);

  return <GalleryGrid items={items} categories={categories} events={events} />;
}
