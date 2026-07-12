"use client";

import { useMemo } from "react";
import Link from "next/link";
import { EventCard } from "@/components/home/EventCard";
import { Skeleton } from "@/components/ui";
import { useKategori } from "@/hooks/useKategori";
import { useKegiatan } from "@/hooks/useKegiatan";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";

interface ProgramRelatedKegiatanProps {
  programName: string;
  programSlug: string;
}

function resolveRelatedCategorySlug(
  programName: string,
  programSlug: string,
  categories: { name: string; slug: string }[],
): string | undefined {
  const nameNorm = programName.trim().toLowerCase();
  const bySlug = categories.find((item) => item.slug === programSlug);
  if (bySlug) return bySlug.slug;

  const byName = categories.find((item) => item.name.trim().toLowerCase() === nameNorm);
  return byName?.slug;
}

export function ProgramRelatedKegiatan({ programName, programSlug }: ProgramRelatedKegiatanProps) {
  const { data: categories, isLoading: categoriesLoading } = useKategori("kegiatan");

  const categorySlug = useMemo(
    () => resolveRelatedCategorySlug(programName, programSlug, categories ?? []),
    [categories, programName, programSlug],
  );

  const { data, isLoading: kegiatanLoading } = useKegiatan(
    {
      category: categorySlug,
      limit: 3,
      sort: "-dateStart",
    },
    { enabled: Boolean(categorySlug) },
  );

  const events = (data?.items ?? []).map(mapKegiatanListItem);
  const isLoading = categoriesLoading || (Boolean(categorySlug) && kegiatanLoading);

  if (isLoading) {
    return (
      <section className="border-t border-foreground/10 bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-6 h-8 w-56 rounded-rmi" />
          <div className="grid gap-4 lg:grid-cols-1">
            <Skeleton className="h-28 w-full rounded-rmi" />
            <Skeleton className="h-28 w-full rounded-rmi" />
            <Skeleton className="h-28 w-full rounded-rmi" />
          </div>
        </div>
      </section>
    );
  }

  if (!categorySlug || events.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-foreground/10 bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl">Kegiatan terkait</h2>
            <p className="text-caption mt-1 text-foreground/55">
              3 kegiatan terbaru dalam kategori {programName}.
            </p>
          </div>
          <Link
            href="/kegiatan"
            className="text-caption font-medium text-primary hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="grid gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
