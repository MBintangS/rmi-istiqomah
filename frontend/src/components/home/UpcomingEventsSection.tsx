import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { EventCard } from "@/components/home/EventCard";
import { mockEvents } from "@/data/mock";

const upcomingEvents = mockEvents
  .filter((event) => event.status === "upcoming")
  .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
  .slice(0, 5);

export function UpcomingEventsSection() {
  return (
    <MotionSection className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-caption font-medium text-primary">Agenda Terdekat</p>
            <h2>Jadwal Kegiatan RMI</h2>
            <p className="text-body mt-2 max-w-xl text-foreground/70">
              Ikuti kegiatan rutin dan perayaan besar remaja masjid dalam waktu dekat.
            </p>
          </div>
          <Button href="/kegiatan" variant="outline" size="sm">
            Semua Kegiatan
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
