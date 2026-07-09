"use client";

import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { EventCard } from "@/components/home/EventCard";
import { useKegiatan } from "@/hooks/useKegiatan";
import { useUpcomingAgenda } from "@/hooks/useAgenda";
import { getApiErrorMessage } from "@/lib/api";
import { formatEventDate } from "@/lib/format-date";
import { mapAgendaListItem } from "@/lib/mappers/agenda";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function UpcomingEventsSection() {
  const { data: agendaData, isLoading, isError, error } = useUpcomingAgenda();
  const { data: kegiatanData } = useKegiatan({ limit: 100, sort: "-dateStart" });

  const eventMap = new Map(
    (kegiatanData?.items ?? []).map((item) => [item.id, mapKegiatanListItem(item)]),
  );

  const agendaItems = (agendaData ?? []).map(mapAgendaListItem);

  return (
    <MotionSection tone="soft" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2>Jadwal Kegiatan RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Ikuti kegiatan rutin dan perayaan besar remaja masjid dalam waktu dekat.
          </p>
          <div className="mt-6">
            <Button href="/kegiatan" variant="outline" size="sm">
              Semua Kegiatan
            </Button>
          </div>
        </div>

        {isLoading ? (
          <SkeletonList count={3} />
        ) : isError ? (
          <EmptyState
            title="Gagal memuat agenda"
            description={getApiErrorMessage(error)}
          />
        ) : agendaItems.length === 0 ? (
          <EmptyState
            title="Belum ada agenda terdekat"
            description="Agenda kegiatan akan tampil di sini setelah dijadwalkan."
          />
        ) : (
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {agendaItems.map((agenda) => {
              const event = agenda.eventId ? eventMap.get(agenda.eventId) : undefined;

              if (event) {
                return (
                  <div key={agenda.id} className="py-4">
                    <EventCard
                      event={event}
                      className="rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:shadow-none sm:p-0"
                    />
                  </div>
                );
              }

              return (
                <article
                  key={agenda.id}
                  className="py-4"
                >
                  <h3 className="text-lg font-semibold text-heading">{agenda.title}</h3>
                  <p className="text-caption mt-1 text-foreground/60">
                    <time dateTime={agenda.date}>{formatEventDate(agenda.date)}</time>
                    {agenda.time && (
                      <>
                        <span aria-hidden="true"> · </span>
                        {agenda.time} WIB
                      </>
                    )}
                  </p>
                  {agenda.location && (
                    <p className="text-body mt-1 text-foreground/70">{agenda.location}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
