"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { usePrograms } from "@/hooks/usePrograms";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapProgramListItem } from "@/lib/mappers/program";

export function ProgramsSection() {
  const { data, isPending, isError, error } = usePrograms();
  const programs = (data ?? []).map(mapProgramListItem).slice(0, 3);
  const featured = programs[0];
  const rest = programs.slice(1);

  return (
    <MotionSection tone="slide" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2>Kegiatan andalan RMI</h2>
          <p className="text-body mt-3 text-foreground/70">
            Program unggulan pembinaan remaja masjid yang menjadi ciri khas organisasi.
          </p>
          <div className="mt-5">
            <Button href="/program" variant="outline" size="sm">
              Semua Program
            </Button>
          </div>
        </div>

        {isPending ? (
          <SkeletonList count={3} />
        ) : isError ? (
          <EmptyState
            title="Gagal memuat program"
            description={getApiErrorMessage(error)}
          />
        ) : programs.length === 0 ? (
          <EmptyState
            title="Belum ada program"
            description="Program unggulan RMI akan tampil di sini setelah ditambahkan."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            {featured ? (
              <Link
                href={`/program/${featured.slug}`}
                className="group relative min-h-[22rem] overflow-hidden rounded-rmi bg-heading lg:col-span-7 lg:min-h-[28rem]"
              >
                <Image
                  src={featured.image || PLACEHOLDER_IMAGE}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="text-body max-w-[48ch] text-white/85 line-clamp-3">{featured.description}</p>
                  <span className="text-caption inline-flex items-center font-medium text-secondary">
                    Lihat detail
                    <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ) : null}

            {rest.length > 0 ? (
              <div className="flex flex-col gap-4 lg:col-span-5">
                {rest.map((program) => (
                  <Link
                    key={program.id}
                    href={`/program/${program.slug}`}
                    className="group relative min-h-[10.5rem] flex-1 overflow-hidden rounded-rmi bg-heading sm:min-h-[12rem]"
                  >
                    <Image
                      src={program.image || PLACEHOLDER_IMAGE}
                      alt={program.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-xl font-bold tracking-tight text-white">
                        {program.name}
                      </h3>
                      <p className="text-caption mt-1 line-clamp-2 text-white/80">{program.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
