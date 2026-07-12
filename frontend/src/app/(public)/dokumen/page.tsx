import { DokumenPageContent } from "@/components/dokumen/DokumenPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Dokumen",
  description: "Unduh dokumen publik Remaja Masjid Istiqomah.",
  path: "/dokumen",
});

export default function DokumenPage() {
  return (
    <>
      <PageHero
        title="Dokumen Publik"
        description="Unduh proposal, panduan, laporan, dan formulir kegiatan RMI."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Dokumen" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <DokumenPageContent />
        </div>
      </section>
    </>
  );
}
