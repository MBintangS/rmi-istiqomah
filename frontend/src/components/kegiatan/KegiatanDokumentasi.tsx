"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui";
import { useGaleri } from "@/hooks/useGaleri";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { flattenGaleriItems } from "@/lib/mappers/galeri";

interface KegiatanDokumentasiProps {
  eventId: string;
  eventTitle: string;
}

export function KegiatanDokumentasi({ eventId, eventTitle }: KegiatanDokumentasiProps) {
  const { data, isLoading } = useGaleri(
    {
      eventId,
      limit: 20,
      sort: "order",
    },
    { enabled: Boolean(eventId) },
  );

  const photos = flattenGaleriItems(data?.items ?? []).slice(0, 3);

  if (isLoading) {
    return (
      <div>
        <h3 className="mb-4">Dokumentasi</h3>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-rmi" />
          ))}
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h3>Dokumentasi</h3>
        <Link href="/galeri" className="text-caption font-medium text-primary hover:underline">
          Lihat galeri →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href="/galeri"
            className="group relative aspect-square overflow-hidden rounded-rmi bg-primary/10"
          >
            <Image
              src={photo.url || PLACEHOLDER_IMAGE}
              alt={photo.caption || `Dokumentasi ${eventTitle}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 33vw, 20vw"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
