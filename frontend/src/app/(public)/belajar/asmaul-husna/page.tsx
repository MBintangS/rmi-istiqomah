import { AsmaulHusnaBelajar } from "@/components/belajar/AsmaulHusnaBelajar";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mengenal Asmaul Husna",
  description: "99 nama Allah yang indah, lengkap dengan tulisan Arab, bacaan latin, dan artinya.",
  path: "/belajar/asmaul-husna",
});

export default function AsmaulHusnaPage() {
  return (
    <>
      <PageHero
        title="Mengenal Asmaul Husna"
        description="99 nama Allah yang indah, dengan tulisan Arab, bacaan, dan artinya."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Edukasi", href: "/edukasi" },
          { label: "Belajar", href: "/belajar" },
          { label: "Asmaul Husna" },
        ]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AsmaulHusnaBelajar />
        </div>
      </section>
    </>
  );
}
