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
    limit: 3,
    sort: "-dateStart",
  });

  const events = (data?.items ?? []).map(mapKegiatanListItem);

  return (
    <MotionSection tone="fade" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2>Kegiatan Terakhir</h2>
          <p className="text-body mt-3 text-foreground/70">
            kegiatan RMI yang baru saja berlangsung.
          </p>
        </div>

        {isPending ? (
          <div className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
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
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-heading/0 transition-colors duration-300 group-hover:bg-heading/45" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6">
                  <p className="font-display text-lg font-semibold text-white sm:text-2xl">
                    {event.title}
                  </p>
                </div>
                <span className="sr-only">{event.title}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Button href="/kegiatan" variant="outline">
            Lihat kegiatan lain
          </Button>
        </div>
      </div>
    </MotionSection>
  );
}
