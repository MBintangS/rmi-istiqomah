import Link from "next/link";
import { EventCard } from "@/components/home/EventCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatEventDate } from "@/lib/format-date";
import { getEventById, getUpcomingAgenda } from "@/lib/events";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Agenda",
  description: "Agenda kegiatan terdekat Remaja Masjid Istiqomah.",
  path: "/agenda",
});

export default function AgendaPage() {
  const agendaItems = getUpcomingAgenda();

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
          {agendaItems.length > 0 ? (
            <div className="space-y-4">
              {agendaItems.map((agenda) => {
                const event = agenda.eventId ? getEventById(agenda.eventId) : undefined;

                if (event) {
                  return <EventCard key={agenda.id} event={event} />;
                }

                return (
                  <article
                    key={agenda.id}
                    className="rounded-rmi border border-foreground/10 bg-surface p-5 shadow-soft"
                  >
                    <h2 className="text-lg font-semibold text-heading">{agenda.title}</h2>
                    <p className="text-caption mt-1 text-foreground/60">
                      <time dateTime={agenda.date}>{formatEventDate(agenda.date)}</time>
                      {agenda.time && (
                        <>
                          <span aria-hidden="true"> · </span>
                          {agenda.time} WIB
                        </>
                      )}
                    </p>
                    <p className="text-body mt-2 text-foreground/80">{agenda.description}</p>
                    <p className="text-body mt-1 text-foreground/70">{agenda.location}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-body rounded-rmi border border-dashed border-foreground/20 bg-surface p-8 text-center text-foreground/70">
              Belum ada agenda kegiatan yang dijadwalkan.
            </p>
          )}

          <p className="text-body mt-8 text-center text-foreground/70">
            Lihat semua kegiatan di halaman{" "}
            <Link href="/kegiatan" className="font-medium text-primary hover:underline">
              Kegiatan
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
