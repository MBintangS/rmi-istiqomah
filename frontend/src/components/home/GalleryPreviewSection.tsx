"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useGaleri } from "@/hooks/useGaleri";
import { getGalleryPreviewImages } from "@/lib/mappers/galeri";
import { cn } from "@/lib/utils";

export function GalleryPreviewSection() {
  const { data, isPending, isError } = useGaleri({ limit: 20, sort: "order" });
  const previewImages = getGalleryPreviewImages(data?.items ?? [], 5);

  return (
    <MotionSection tone="fade" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-caption mb-3 font-medium uppercase tracking-[0.18em] text-primary">
            Dokumentasi
          </p>
          <h2>Momen Kegiatan RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Cuplikan foto kegiatan rutin, perayaan besar, dan aktivitas sosial remaja masjid.
          </p>
          <div className="mt-6">
            <Button href="/galeri" variant="outline" size="sm">
              Lihat Galeri
            </Button>
          </div>
        </div>

        {isPending ? (
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className={cn("rounded-rmi", index === 0 && "col-span-2 row-span-2")}
              />
            ))}
          </div>
        ) : isError || previewImages.length === 0 ? (
          <EmptyState
            title="Belum ada foto galeri"
            description="Dokumentasi kegiatan akan tampil di sini setelah diunggah."
          />
        ) : (
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
            {previewImages.map((image, index) => (
              <Link
                key={`${image.url}-${index}`}
                href="/galeri"
                className={cn(
                  "group relative overflow-hidden rounded-rmi",
                  index === 0 && "col-span-2 row-span-2",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 40vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-heading/0 transition-colors group-hover:bg-heading/20" />
                <span className="sr-only">{image.caption}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
