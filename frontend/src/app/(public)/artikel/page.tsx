import { ArtikelPageContent } from "@/components/artikel/ArtikelPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Artikel Islami",
  description: "Artikel dakwah, tips ibadah, dan kajian dari Remaja Masjid Istiqomah.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  return (
    <>
      <PageHero
        title="Artikel Islami"
        description="Bacaan ringan seputar dakwah, tips ibadah, dan kajian untuk remaja muslim."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Artikel Islami" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ArtikelPageContent />
        </div>
      </section>
    </>
  );
}
