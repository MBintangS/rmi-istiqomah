"use client";

import { MotionSection } from "@/components/home/MotionSection";
import { usePublicCounts } from "@/hooks/usePublicCounts";

const statItems = [
  { key: "totalKegiatan", label: "Kegiatan" },
  { key: "totalArtikel", label: "Artikel" },
  { key: "totalGaleri", label: "Foto galeri" },
] as const;

export function StatsSection() {
  const { data } = usePublicCounts();
  const counts = data ?? { totalArtikel: 0, totalKegiatan: 0, totalGaleri: 0 };

  return (
    <MotionSection tone="soft" className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-3 gap-4 sm:gap-10">
          {statItems.map(({ key, label }, index) => (
            <div key={key} className="min-w-0">
              <dt className="text-caption text-foreground/60">{label}</dt>
              <dd className="mt-1 flex items-baseline gap-2 font-display text-3xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                {index > 0 ? (
                  <span
                    className="hidden h-2 w-2 shrink-0 rotate-45 bg-secondary sm:inline-block"
                    aria-hidden="true"
                  />
                ) : null}
                {counts[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
