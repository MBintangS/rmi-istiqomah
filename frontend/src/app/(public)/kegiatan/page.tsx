import { KegiatanPageContent } from "@/components/kegiatan/KegiatanPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Kegiatan",
  description: "Daftar kegiatan Remaja Masjid Istiqomah: rutin maupun acara besar.",
  path: "/kegiatan",
});

export default function KegiatanIndexPage() {
  return (
    <>
      <PageHero
        title="Kegiatan RMI"
        description="Jadwal kegiatan rutin dan perayaan besar remaja masjid Istiqomah."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kegiatan" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <KegiatanPageContent />
        </div>
      </section>
    </>
  );
}
