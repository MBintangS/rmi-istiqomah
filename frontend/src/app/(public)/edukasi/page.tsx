import { EdukasiHub } from "@/components/edukasi/EdukasiHub";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Edukasi",
  description: "Belajar huruf hijaiyah, tata cara wudu, dan asmaul husna, lalu berlatih lewat permainan Islami.",
  path: "/edukasi",
});

export default function EdukasiPage() {
  return (
    <>
      <PageHero
        title="Edukasi"
        description="Pelajari dasar-dasar Islam, lalu berlatih lewat permainan."
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Edukasi" }]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EdukasiHub />
        </div>
      </section>
    </>
  );
}
