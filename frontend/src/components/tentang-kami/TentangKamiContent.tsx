"use client";

import Image from "next/image";
import { PengurusCard } from "@/components/about/PengurusCard";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useBanners } from "@/hooks/useBanners";
import { usePengurus } from "@/hooks/usePengurus";
import { useSettingsValue } from "@/hooks/useSettings";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapPengurusListItem } from "@/lib/mappers/pengurus";

export function TentangKamiContent() {
  const { siteName, about, vision, mission, stats } = useSettingsValue();
  const { data: banners } = useBanners();
  const { data: pengurusData, isLoading, isError, error } = usePengurus();

  const aboutImage = banners?.[0]?.image || PLACEHOLDER_IMAGE;
  const pengurus = (pengurusData ?? []).map(mapPengurusListItem).sort((a, b) => a.order - b.order);
  const periodLabel = pengurus.find((item) => item.period)?.period;

  return (
    <>
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-rmi shadow-soft">
            <Image
              src={aboutImage}
              alt={`Kegiatan ${siteName}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-5">
            <p className="text-caption font-medium text-primary">Profil Organisasi</p>
            <h2>{siteName}</h2>
            <p className="text-body text-foreground/80">{about}</p>
            <p className="text-body text-foreground/80">
              Sejak {stats.establishedYear}, {siteName} telah menjadi motor penggerak kegiatan
              keagamaan dan sosial di lingkungan masjid, dengan fokus pada pembinaan karakter remaja
              muslim yang aktif, kreatif, dan berakhlak mulia.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-caption font-medium text-primary">Visi &amp; Misi</p>
            <h2>Landasan Organisasi</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-rmi border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">Visi</h3>
              <blockquote className="text-body border-l-4 border-secondary pl-4 text-heading italic">
                &ldquo;{vision}&rdquo;
              </blockquote>
            </div>

            <div className="rounded-rmi border border-foreground/10 bg-background p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">Misi</h3>
              <ul className="space-y-3">
                {mission.map((item, index) => (
                  <li key={item} className="flex gap-3 text-body text-foreground/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-caption font-medium text-primary">Struktur Kepengurusan</p>
            <h2>Pengurus RMI</h2>
            {periodLabel && (
              <p className="text-body mx-auto mt-2 max-w-xl text-foreground/70">
                Periode kepengurusan {periodLabel}.
              </p>
            )}
          </div>

          {isLoading ? (
            <SkeletonList count={4} />
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pengurus.map((item) => (
                <PengurusCard key={item.id} pengurus={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
