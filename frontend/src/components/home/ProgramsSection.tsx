import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { ProgramCard } from "@/components/home/ProgramCard";
import { mockPrograms } from "@/data/mock";

export function ProgramsSection() {
  return (
    <MotionSection className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-caption font-medium text-primary">Program Unggulan</p>
            <h2>Kegiatan Andalan RMI</h2>
            <p className="text-body mt-2 max-w-xl text-foreground/70">
              Tiga program tahunan yang menjadi ciri khas pembinaan remaja masjid.
            </p>
          </div>
          <Button href="/program" variant="outline" size="sm">
            Semua Program
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
