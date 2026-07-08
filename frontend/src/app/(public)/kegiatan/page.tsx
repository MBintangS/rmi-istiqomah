import type { Metadata } from "next";
import { EventList } from "@/components/events/EventList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getEventCategories, getPublishedEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Kegiatan",
  description: "Daftar kegiatan Remaja Masjid Istiqomah — rutin maupun acara besar.",
};

export default function KegiatanIndexPage() {
  const events = getPublishedEvents();
  const categories = getEventCategories();

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Kegiatan" },
            ]}
            className="mb-4"
          />
          <h1>Kegiatan RMI</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Jadwal kegiatan rutin dan perayaan besar remaja masjid Istiqomah.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EventList events={events} categories={categories} />
        </div>
      </section>
    </>
  );
}
