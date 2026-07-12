import { ProgramPageContent } from "@/components/program/ProgramPageContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Program",
  description: "Program unggulan Remaja Masjid Istiqomah.",
  path: "/program",
});

export default function ProgramIndexPage() {
  return (
    <>
      <PageHero
        title="Program Unggulan"
        description="Program pembinaan remaja masjid Istiqomah."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Program" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProgramPageContent />
        </div>
      </section>
    </>
  );
}
