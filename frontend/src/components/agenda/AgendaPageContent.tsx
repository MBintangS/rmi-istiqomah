"use client";

import Link from "next/link";
import { EventCard } from "@/components/home/EventCard";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useAgenda } from "@/hooks/useAgenda";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { formatEventDate } from "@/lib/format-date";
import { mapAgendaListItem } from "@/lib/mappers/agenda";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function AgendaPageContent() {
  const { data, isLoading, isError, error, refetch } = useAgenda({ limit: 50, sort: "date" });
  const { data: kegiatanData } = useKegiatan({ limit: 100, sort: "-dateStart" });

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat agenda"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const agendaItems = (data ?? []).map(mapAgendaListItem);
  const eventMap = new Map(
    (kegiatanData?.items ?? []).map((item) => [item.id, mapKegiatanListItem(item)]),
  );

  if (agendaItems.length === 0) {
    return (
      <EmptyState
        title="Belum ada agenda"
        description="Agenda kegiatan RMI akan tampil di sini setelah dijadwalkan."
      />
    );
  }

  return (
    <>
      <div className="space-y-4">
        {agendaItems.map((agenda) => {
          const event = agenda.eventId ? eventMap.get(agenda.eventId) : undefined;

          if (event) {
            return <EventCard key={agenda.id} event={event} />;
          }

          return (
            <article
              key={agenda.id}
              className="rounded-rmi border border-foreground/10 bg-surface p-5 shadow-soft"
            >
              <h2 className="text-lg font-semibold text-heading">{agenda.title}</h2>
              <p className="text-caption mt-1 text-foreground/60">
                <time dateTime={agenda.date}>{formatEventDate(agenda.date)}</time>
                {agenda.time && (
                  <>
                    <span aria-hidden="true"> · </span>
                    {agenda.time} WIB
                  </>
                )}
              </p>
              {agenda.description && (
                <p className="text-body mt-2 text-foreground/80">{agenda.description}</p>
              )}
              {agenda.location && (
                <p className="text-body mt-1 text-foreground/70">{agenda.location}</p>
              )}
            </article>
          );
        })}
      </div>

      <p className="text-body mt-8 text-center text-foreground/70">
        Lihat semua kegiatan di halaman{" "}
        <Link href="/kegiatan" className="font-medium text-primary hover:underline">
          Kegiatan
        </Link>
        .
      </p>
    </>
  );
}
