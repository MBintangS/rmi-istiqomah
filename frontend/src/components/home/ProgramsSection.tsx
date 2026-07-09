import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { mockPrograms } from "@/data/mock";
import { cn } from "@/lib/utils";

export function ProgramsSection() {
  const programs = mockPrograms;

  return (
    <MotionSection tone="slide" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <h2>Kegiatan Andalan RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Tiga program tahunan yang menjadi ciri khas pembinaan remaja masjid.
          </p>
          <div className="mt-6">
            <Button href="/program" variant="outline" size="sm">
              Semua Program
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {programs.map((program, index) => (
            <Link
              key={program.id}
              href={`/program/${program.slug}`}
              className={cn(
                "group grid overflow-hidden rounded-rmi bg-background md:grid-cols-12",
                index % 2 === 1 && "md:[&>div:first-child]:order-2",
              )}
            >
              <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[280px]">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4 p-6 md:col-span-7 md:p-10">
                <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                  {program.name}
                </h3>
                <p className="text-body max-w-[52ch] text-foreground/75">{program.description}</p>
                <span className="text-caption inline-flex items-center font-medium text-primary">
                  Lihat detail
                  <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
