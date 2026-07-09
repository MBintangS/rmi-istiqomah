import { AgendaPageContent } from "@/components/agenda/AgendaPageContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Agenda",
  description: "Agenda kegiatan terdekat Remaja Masjid Istiqomah.",
  path: "/agenda",
});

export default function AgendaPage() {
  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Agenda" },
            ]}
            className="mb-4"
          />
          <h2>Agenda Terdekat</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Kegiatan RMI yang akan segera dilaksanakan. Ikuti jadwal terbaru di bawah ini.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AgendaPageContent />
        </div>
      </section>
    </>
  );
}
