import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { EventCard } from "@/components/home/EventCard";
import { mockEvents } from "@/data/mock";

const upcomingEvents = mockEvents
  .filter((event) => event.status === "upcoming")
  .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
  .slice(0, 4);

export function UpcomingEventsSection() {
  return (
    <MotionSection tone="soft" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2>Jadwal Kegiatan RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Ikuti kegiatan rutin dan perayaan besar remaja masjid dalam waktu dekat.
          </p>
          <div className="mt-6">
            <Button href="/kegiatan" variant="outline" size="sm">
              Semua Kegiatan
            </Button>
          </div>
        </div>

        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="py-4">
              <EventCard
                event={event}
                className="rounded-none border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:shadow-none sm:p-0"
              />
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
