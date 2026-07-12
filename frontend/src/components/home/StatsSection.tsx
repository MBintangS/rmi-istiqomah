"use client";

import { MotionSection } from "@/components/home/MotionSection";
import { usePublicCounts } from "@/hooks/usePublicCounts";

const statItems = [
  { key: "totalKegiatan", label: "Total Kegiatan" },
  { key: "totalArtikel", label: "Total Artikel" },
  { key: "totalGaleri", label: "Total Galeri" },
] as const;

export function StatsSection() {
  const { data } = usePublicCounts();
  const counts = data ?? { totalArtikel: 0, totalKegiatan: 0, totalGaleri: 0 };

  return (
    <MotionSection tone="soft" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-3 gap-x-8 gap-y-10">
          {statItems.map(({ key, label }) => (
            <div key={key} className="min-w-0 text-center">
              <dt className="text-caption font-medium text-foreground/55">{label}</dt>
              <dd className="mt-2 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                {counts[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
