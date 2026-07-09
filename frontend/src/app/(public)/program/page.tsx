import { ProgramPageContent } from "@/components/program/ProgramPageContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Program",
  description: "Program unggulan Remaja Masjid Istiqomah.",
  path: "/program",
});

export default function ProgramIndexPage() {
  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Program" },
            ]}
            className="mb-4"
          />
          <h2>Program Unggulan</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Program pembinaan remaja masjid Istiqomah.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProgramPageContent />
        </div>
      </section>
    </>
  );
}
