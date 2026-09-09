"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useGaleri } from "@/hooks/useGaleri";
import { getGalleryPreviewImages } from "@/lib/mappers/galeri";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function GalleryPreviewSection() {
  const { data, isPending, isError } = useGaleri({ limit: 20, sort: "-createdAt" });
  const previewImages = getGalleryPreviewImages(data?.items ?? [], 5);

  return (
    <MotionSection tone="fade" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2>Momen kegiatan RMI</h2>
          <p className="text-body mt-3 text-foreground/70">
            Cuplikan foto kegiatan rutin, perayaan besar, dan aktivitas sosial remaja masjid.
          </p>
          <div className="mt-5">
            <Button href="/galeri" variant="outline" size="sm">
              Lihat Galeri
            </Button>
          </div>
        </div>

        {isPending ? (
          <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 md:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className={cn("rounded-rmi", index === 0 && "col-span-2 row-span-2")}
              />
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            title="Gagal memuat galeri"
            description="Dokumentasi kegiatan tidak dapat ditampilkan saat ini."
          />
        ) : previewImages.length === 0 ? (
          <EmptyState
            title="Belum ada foto galeri"
            description="Dokumentasi kegiatan akan tampil di sini setelah diunggah."
          />
        ) : (
          <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 md:grid-cols-4">
            {previewImages.map((image, index) => (
              <Link
                key={`${image.url}-${index}`}
                href="/galeri"
                className={cn(
                  "group relative overflow-hidden rounded-rmi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  index === 0 && "col-span-2 row-span-2",
                )}
              >
                <Image
                  src={image.url || PLACEHOLDER_IMAGE}
                  alt={image.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 40vw"
                  loading="lazy"
                />
                <span className="sr-only">{image.caption}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
