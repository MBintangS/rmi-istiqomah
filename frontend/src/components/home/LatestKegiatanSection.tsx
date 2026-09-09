"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

export function LatestKegiatanSection() {
  const { data, isPending, isError, error } = useKegiatan({
    limit: 6,
    sort: "-dateStart",
  });

  const events = (data?.items ?? []).map(mapKegiatanListItem);

  return (
    <MotionSection tone="fade" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2>Kegiatan terakhir</h2>
          <p className="text-body mt-3 text-foreground/70">
            Jejak aktivitas RMI yang baru saja berlangsung.
          </p>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="aspect-[3/1] w-full rounded-rmi" />
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            title="Gagal memuat kegiatan"
            description={getApiErrorMessage(error)}
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="Belum ada kegiatan"
            description="Kegiatan terbaru akan tampil di sini setelah dipublikasikan."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/kegiatan/${event.slug}`}
                className="group relative block aspect-[3/1] overflow-hidden rounded-rmi bg-primary/10"
              >
                <Image
                  src={event.thumbnail || PLACEHOLDER_IMAGE}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/80 via-heading/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-lg font-semibold text-white sm:text-xl">
                    {event.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Button href="/kegiatan" variant="outline">
            Lihat kegiatan lain
          </Button>
        </div>
      </div>
    </MotionSection>
  );
}
