import { Amiri } from "next/font/google";
import { IbadahPageContent } from "@/components/ibadah/IbadahPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = buildPageMetadata({
  title: "Ibadah",
  description: "Jadwal sholat dan Al-Qur'an Remaja Masjid Istiqomah.",
  path: "/ibadah",
});

export default function IbadahIndexPage() {
  return (
    <>
      <PageHero
        title="Ibadah"
        description="Jadwal sholat Kota Bogor dan Al-Qur'an digital RMI."
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Ibadah" }]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <IbadahPageContent arabicClassName={amiri.className} />
        </div>
      </section>
    </>
  );
}
