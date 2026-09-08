"use client";

import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { EventCard } from "@/components/home/EventCard";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function UpcomingEventsSection() {
  const { data, isPending, isError, error } = useKegiatan({
    status: "upcoming",
    limit: 4,
    sort: "dateStart",
  });

  const events = (data?.items ?? []).map(mapKegiatanListItem);

  return (
    <MotionSection tone="soft" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2>Jadwal kegiatan RMI</h2>
          <p className="text-body mt-3 text-foreground/70">
            Ikuti kegiatan rutin dan perayaan besar remaja masjid dalam waktu dekat.
          </p>
          <div className="mt-5">
            <Button href="/kegiatan" variant="outline" size="sm">
              Semua Kegiatan
            </Button>
          </div>
        </div>

        {isPending ? (
          <SkeletonList count={3} />
        ) : isError ? (
          <EmptyState
            title="Gagal memuat kegiatan"
            description={getApiErrorMessage(error)}
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="Belum ada kegiatan terdekat"
            description="Kegiatan RMI akan tampil di sini setelah dijadwalkan."
          />
        ) : (
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="min-w-[68%] snap-start sm:min-w-0">
                <EventCard event={event} compact />
              </div>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
