"use client";

import { EventList } from "@/components/events/EventList";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { getEventCategoriesFromList, mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function KegiatanPageContent() {
  const { data, isLoading, isError, error, refetch } = useKegiatan({
    limit: 50,
    sort: "-dateStart",
  });

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat kegiatan"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const events = (data?.items ?? []).map(mapKegiatanListItem);

  if (events.length === 0) {
    return (
      <EmptyState
        title="Belum ada kegiatan"
        description="Kegiatan RMI akan tampil di sini setelah dipublikasikan."
      />
    );
  }

  const categories = getEventCategoriesFromList(events);

  return <EventList events={events} categories={categories} />;
}
