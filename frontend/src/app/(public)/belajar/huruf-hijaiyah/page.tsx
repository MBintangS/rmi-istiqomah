import { HurufHijaiyahBelajar } from "@/components/belajar/HurufHijaiyahBelajar";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mengenal Huruf Hijaiyah",
  description: "28 huruf hijaiyah beserta nama dan cara bacanya dengan fathah, kasrah, dan dhammah.",
  path: "/belajar/huruf-hijaiyah",
});

export default function HurufHijaiyahPage() {
  return (
    <>
      <PageHero
        title="Mengenal Huruf Hijaiyah"
        description="Pilih harakat, lalu ketuk huruf untuk melihat nama dan cara bacanya."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Edukasi", href: "/edukasi" },
          { label: "Belajar", href: "/belajar" },
          { label: "Huruf Hijaiyah" },
        ]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <HurufHijaiyahBelajar />
        </div>
      </section>
    </>
  );
}
