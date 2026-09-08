"use client";

import { PengurusCard } from "@/components/about/PengurusCard";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { usePengurus } from "@/hooks/usePengurus";
import { useSettingsValue } from "@/hooks/useSettings";
import { getApiErrorMessage } from "@/lib/api";
import { mapPengurusListItem } from "@/lib/mappers/pengurus";

export function TentangKamiContent() {
  const { siteName, about, vision, mission } = useSettingsValue();
  const { data: pengurusData, isLoading, isError, error } = usePengurus();

  const pengurus = (pengurusData ?? []).map(mapPengurusListItem).sort((a, b) => a.order - b.order);
  const periodLabel = pengurus.find((item) => item.period)?.period;

  return (
    <>
      <MotionSection tone="slide" className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-rmi sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]">
            <RmiLogo size={280} className="h-auto w-[72%] max-w-[18rem] sm:max-w-[20rem]" />
          </div>

          <div className="space-y-5 lg:col-span-7">
            <h2 className="max-w-[14ch]">{siteName}</h2>
            <p className="text-body max-w-[58ch] text-foreground/80">{about}</p>
            <p className="text-body max-w-[58ch] text-foreground/80">
              {siteName} menjadi motor penggerak kegiatan keagamaan dan sosial di lingkungan
              masjid, dengan fokus pada pembinaan karakter remaja muslim yang aktif, kreatif, dan
              berakhlak mulia.
            </p>
            <Button href="/kontak" variant="outline">
              Gabung Bersama Kami
            </Button>
          </div>
        </div>
      </MotionSection>

      <MotionSection tone="soft" className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-primary">Visi</h2>
              <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug text-heading sm:text-3xl">
                &ldquo;{vision}&rdquo;
              </blockquote>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-primary">Misi</h2>
              <ul className="mt-4 space-y-4">
                {mission.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-foreground/80">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-secondary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection tone="soft" className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <h2>Pengurus RMI</h2>
            {periodLabel && (
              <p className="text-body mt-2 text-foreground/70">
                Periode kepengurusan {periodLabel}.
              </p>
            )}
          </div>

          {isLoading ? (
            <SkeletonList count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
          ) : isError ? (
            <EmptyState
              title="Gagal memuat pengurus"
              description={getApiErrorMessage(error)}
            />
          ) : pengurus.length === 0 ? (
            <EmptyState
              title="Belum ada data pengurus"
              description="Data kepengurusan akan tampil di sini setelah ditambahkan."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pengurus.map((item) => (
                <PengurusCard key={item.id} pengurus={item} />
              ))}
            </div>
          )}
        </div>
      </MotionSection>
    </>
  );
}
