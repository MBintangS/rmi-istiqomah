import { DokumenPageContent } from "@/components/dokumen/DokumenPageContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Dokumen",
  description: "Unduh dokumen publik Remaja Masjid Istiqomah.",
  path: "/dokumen",
});

export default function DokumenPage() {
  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Dokumen" },
            ]}
            className="mb-4"
          />
          <h2>Dokumen Publik</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Unduh proposal, panduan, laporan, dan formulir kegiatan RMI.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <DokumenPageContent />
        </div>
      </section>
    </>
  );
}
