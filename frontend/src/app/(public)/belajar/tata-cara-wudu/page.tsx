import { TataCaraWuduBelajar } from "@/components/belajar/TataCaraWuduBelajar";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mengenal Tata Cara Wudu",
  description: "Langkah wudu dari niat sampai membasuh kaki, fardu dan pembatal wudu, serta doa sesudahnya.",
  path: "/belajar/tata-cara-wudu",
});

export default function TataCaraWuduPage() {
  return (
    <>
      <PageHero
        title="Mengenal Tata Cara Wudu"
        description="Urutan wudu dari niat sampai membasuh kaki, lengkap dengan bacaan niat dan doa sesudahnya."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Edukasi", href: "/edukasi" },
          { label: "Belajar", href: "/belajar" },
          { label: "Tata Cara Wudu" },
        ]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TataCaraWuduBelajar />
        </div>
      </section>
    </>
  );
}
