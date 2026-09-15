"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const AYAH_ARABIC = "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ";
const AYAH_ID = "Bacalah dengan nama Tuhanmu yang menciptakan.";
const AYAH_REF = "QS. Al-‘Alaq 96:1";

function BookmarkRibbon() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-10 -translate-x-1/2 lg:block"
      aria-hidden="true"
    >
      <span className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/10" />
      <span className="absolute left-1/2 top-0 h-24 w-2.5 -translate-x-1/2 bg-secondary [clip-path:polygon(0_0,100%_0,100%_100%,50%_84%,0_100%)]" />
    </div>
  );
}

export function QuranComingSoon({ arabicClassName }: { arabicClassName: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Ibadah", href: "/ibadah" },
            { label: "Al-Qur'an" },
          ]}
          className="mb-8 sm:mb-10"
        />

        <div className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface shadow-soft">
          <BookmarkRibbon />

          <div className="grid lg:grid-cols-2">
            <article
              className={cn(
                "relative order-1 flex min-h-[22rem] flex-col justify-between px-6 py-10 sm:min-h-[26rem] sm:px-10 sm:py-14 lg:order-2 lg:min-h-[32rem] lg:px-14",
                "lg:bg-gradient-to-r lg:from-ink/[0.04] lg:to-transparent",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary-alt">
                {AYAH_REF}
              </p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.12 }}
                className="py-10 text-center lg:py-6"
              >
                <p
                  lang="ar"
                  dir="rtl"
                  className={cn(
                    arabicClassName,
                    "text-[2.35rem] font-bold leading-[1.7] text-heading sm:text-5xl",
                  )}
                >
                  {AYAH_ARABIC}
                </p>
                <p lang="id" className="mx-auto mt-6 max-w-[28ch] text-base leading-relaxed text-foreground/70">
                  {AYAH_ID}
                </p>
              </motion.div>

              <div className="flex items-center justify-center gap-2 lg:justify-end" aria-hidden="true">
                <span className="h-1.5 w-1.5 rotate-45 bg-secondary" />
                <span className="h-px w-10 bg-gradient-to-r from-secondary to-transparent" />
              </div>
            </article>

            <article className="order-2 flex flex-col justify-center border-t border-foreground/10 px-6 py-10 sm:px-10 sm:py-14 lg:order-1 lg:border-r lg:border-t-0 lg:px-12 lg:py-16">
              <p className="inline-flex w-fit items-center rounded-full border border-secondary/40 bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                Dalam tahap pengembangan
              </p>

              <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
                {"Al-Qur'an"}
              </h1>
              <p className="mt-4 max-w-[34ch] text-body text-foreground/70">
                Mushaf digital RMI belum bisa dibuka. Kami sedang menyiapkan halaman ini.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/ibadah/jadwal-sholat">Jadwal sholat</Button>
                <Button href="/" variant="outline">
                  Ke beranda
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
