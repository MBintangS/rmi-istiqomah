import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { mockGalleryPreview } from "@/data/mock";

export function GalleryPreviewSection() {
  return (
    <MotionSection className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-caption font-medium text-primary">Dokumentasi</p>
            <h2>Momen Kegiatan RMI</h2>
            <p className="text-body mt-2 max-w-xl text-foreground/70">
              Cuplikan foto kegiatan rutin, perayaan besar, dan aktivitas sosial remaja masjid.
            </p>
          </div>
          <Button href="/galeri" variant="outline" size="sm">
            Lihat Galeri
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {mockGalleryPreview.map((image, index) => (
            <Link
              key={`${image.url}-${index}`}
              href="/galeri"
              className="group relative aspect-square overflow-hidden rounded-rmi shadow-soft"
            >
              <Image
                src={image.url}
                alt={image.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
              <span className="sr-only">{image.caption}</span>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
