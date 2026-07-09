"use client";

import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { EventCard } from "@/components/home/EventCard";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function UpcomingEventsSection() {
  const { data, isLoading, isError, error } = useKegiatan({
    status: "upcoming",
    limit: 4,
    sort: "dateStart",
  });

  const events = (data?.items ?? []).map(mapKegiatanListItem);

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
            title="Gagal memuat kegiatan"
            description={getApiErrorMessage(error)}
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="Belum ada kegiatan terdekat"
            description="Kegiatan RMI akan tampil di sini setelah dijadwalkan."
          />
        ) : (
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {events.map((event) => (
              <div key={event.id} className="py-4">
                <EventCard
                  event={event}
                  className="rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:shadow-none sm:p-0"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
