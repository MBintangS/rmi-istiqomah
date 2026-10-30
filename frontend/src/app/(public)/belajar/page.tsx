import { BelajarHub } from "@/components/belajar/BelajarHub";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Belajar",
  description: "Materi singkat Remaja Masjid Istiqomah: huruf hijaiyah, tata cara wudu, dan asmaul husna.",
  path: "/belajar",
});

export default function BelajarPage() {
  return (
    <>
      <PageHero
        title="Belajar"
        description="Kenali huruf hijaiyah, tata cara wudu, dan asmaul husna. Setelah itu, uji hasilnya di permainan."
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Edukasi", href: "/edukasi" }, { label: "Belajar" }]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BelajarHub />
        </div>
      </section>
    </>
  );
}
