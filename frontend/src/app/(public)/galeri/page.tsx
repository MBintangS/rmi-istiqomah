import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  getGalleryCategories,
  getGalleryEventFilters,
  getGalleryItems,
} from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi foto kegiatan Remaja Masjid Istiqomah.",
};

export default function GaleriPage() {
  const items = getGalleryItems();
  const categories = getGalleryCategories();
  const events = getGalleryEventFilters();

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Galeri" },
            ]}
            className="mb-4"
          />
          <h1>Galeri Kegiatan</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Dokumentasi foto kegiatan rutin, perayaan besar, dan aktivitas remaja masjid.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={items} categories={categories} events={events} />
        </div>
      </section>
    </>
  );
}
