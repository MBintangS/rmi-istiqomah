import { GaleriPageContent } from "@/components/galeri/GaleriPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Galeri",
  description: "Dokumentasi foto kegiatan Remaja Masjid Istiqomah.",
  path: "/galeri",
});

export default function GaleriPage() {
  return (
    <>
      <PageHero
        title="Galeri"
        description="Dokumentasi foto kegiatan Remaja Masjid Istiqomah."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Galeri" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GaleriPageContent />
        </div>
      </section>
    </>
  );
}
