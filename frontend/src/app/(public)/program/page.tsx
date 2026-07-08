import type { Metadata } from "next";
import { ProgramCard } from "@/components/home/ProgramCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getActivePrograms } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Program",
  description: "Program unggulan Remaja Masjid Istiqomah: Isra Miraj, Maulid Nabi, dan Sanlat.",
};

export default function ProgramIndexPage() {
  const programs = getActivePrograms();

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
          <h1>Program Unggulan</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Tiga program tahunan yang menjadi ciri khas pembinaan remaja masjid Istiqomah.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
