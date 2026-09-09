"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { Button } from "@/components/ui";
import { useHasMounted } from "@/hooks/useHasMounted";
import { usePublicCounts } from "@/hooks/usePublicCounts";
import { useSettingsValue } from "@/hooks/useSettings";
import { heroItem, heroOrchestration } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HeroLogo3D = dynamic(
  () => import("@/components/home/HeroLogo3D").then((mod) => mod.HeroLogo3D),
  { ssr: false },
);

function StatBadge({
  label,
  value,
  className,
  floatClass,
}: {
  label: string;
  value: string;
  className?: string;
  floatClass?: string;
}) {
  return (
    <div className={cn("pointer-events-auto", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-background/85 px-4 py-3 shadow-soft ring-1 ring-primary/15 backdrop-blur-md",
          floatClass,
        )}
      >
        <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
        <div>
          <p className="text-caption text-foreground/70">{label}</p>
          <p className="font-display text-lg font-bold leading-tight text-heading">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const mounted = useHasMounted();
  const settings = useSettingsValue();
  const { data: counts } = usePublicCounts();
  const prefersReduced = useReducedMotion();
  const reduce = mounted && !!prefersReduced;
  const { siteName, tagline } = settings;

  const kegiatan = counts?.totalKegiatan ?? 0;
  const artikel = counts?.totalArtikel ?? 0;
  const galeri = counts?.totalGaleri ?? 0;

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.055] via-background to-background" />
        <div className="absolute left-1/2 top-[4%] h-[26rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-3xl sm:h-[32rem] sm:w-[46rem]" />
        <div className="absolute left-[10%] top-[30%] h-48 w-48 rotate-45 bg-accent-green/[0.10] blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute right-[12%] top-[16%] h-36 w-36 rotate-45 bg-secondary/[0.12] blur-2xl" />
        <div className="hero-diamond-field" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/85 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col items-center px-4 pb-10 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="relative w-full pb-6 md:pb-10">
          <div
            className="relative z-20 mx-auto h-[260px] w-full max-w-[600px] sm:h-[320px] md:h-[380px]"
            role="img"
            aria-label={`Logo 3D ${siteName}`}
          >
            {mounted ? (
              <HeroLogo3D reduceMotion={reduce} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <RmiLogo size={160} priority />
              </div>
            )}
          </div>

          <motion.div
            className="relative z-30 -mt-4 text-center sm:-mt-6 md:-mt-8"
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={reduce ? undefined : heroOrchestration}
          >
            <span
              className="mb-4 inline-block h-2 w-2 rotate-45 bg-secondary"
              aria-hidden="true"
            />

            <h1 className="mx-auto max-w-[16ch] text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:leading-[1.12]">
              {siteName}
            </h1>

            <motion.p
              variants={reduce ? undefined : heroItem}
              className="text-body mx-auto mt-3 max-w-[42ch] text-foreground/75 sm:mt-4"
            >
              {tagline}
            </motion.p>

            <motion.div
              variants={reduce ? undefined : heroItem}
              className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 sm:-space-x-2"
            >
              <Button href="/kegiatan" size="lg" className="w-full sm:w-auto sm:origin-center sm:scale-[0.96]">
                Lihat Kegiatan
              </Button>
              <Button
                href="/kontak"
                variant="outline"
                size="lg"
                className="w-full bg-background/90 sm:w-auto sm:origin-center sm:scale-[0.96]"
              >
                Gabung Bersama Kami
              </Button>
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-40 hidden lg:block" aria-hidden="true">
            <StatBadge
              label="Kegiatan"
              value={String(kegiatan)}
              className="absolute left-[8%] top-[12%] xl:left-[14%] xl:top-[8%]"
              floatClass={reduce ? undefined : "float-badge"}
            />
            <StatBadge
              label="Artikel"
              value={String(artikel)}
              className="absolute right-[8%] top-[10%] xl:right-[14%] xl:top-[6%]"
              floatClass={reduce ? undefined : "float-badge-alt float-badge-delay-1"}
            />
            <StatBadge
              label="Foto galeri"
              value={String(galeri)}
              className="absolute bottom-[38%] left-[6%] xl:bottom-[30%] xl:left-[10%]"
              floatClass={reduce ? undefined : "float-badge-alt float-badge-delay-2"}
            />
            <StatBadge
              label="Komunitas"
              value="RMI"
              className="absolute bottom-[36%] right-[6%] xl:bottom-[30%] xl:right-[11%]"
              floatClass={reduce ? undefined : "float-badge float-badge-delay-1"}
            />
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-lg flex-wrap justify-center gap-2 lg:hidden">
          <StatBadge label="Kegiatan" value={String(kegiatan)} />
          <StatBadge label="Artikel" value={String(artikel)} />
          <StatBadge label="Foto galeri" value={String(galeri)} />
        </div>
      </div>
    </section>
  );
}
