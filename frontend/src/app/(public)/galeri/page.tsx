import { GaleriPageContent } from "@/components/galeri/GaleriPageContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Galeri",
  description: "Dokumentasi foto kegiatan Remaja Masjid Istiqomah.",
  path: "/galeri",
});

export default function GaleriPage() {
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
          <h2>Galeri</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Dokumentasi foto kegiatan Remaja Masjid Istiqomah.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GaleriPageContent />
        </div>
      </section>
    </>
  );
}
