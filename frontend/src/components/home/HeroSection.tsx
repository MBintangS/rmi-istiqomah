"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui";
import { useBanners } from "@/hooks/useBanners";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSettingsValue } from "@/hooks/useSettings";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { heroItem, heroOrchestration } from "@/lib/motion";

export function HeroSection() {
  const mounted = useHasMounted();
  const settings = useSettingsValue();
  const { data: banners } = useBanners();
  const prefersReduced = useReducedMotion();
  const reduce = mounted && !!prefersReduced;

  const heroBanner = mounted ? banners?.[0] : undefined;
  const heroImage = heroBanner?.image || PLACEHOLDER_IMAGE;
  const heroAlt = heroBanner?.title ?? "Kegiatan remaja masjid";
  const { siteName, tagline, about } = settings;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Right panel - green atmosphere like PageHero */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[46%] bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-[radial-gradient(ellipse_at_top_right,_rgba(78,131,10,0.14),_transparent_55%)] lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 hidden h-64 w-64 rounded-full bg-primary/10 blur-3xl lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[8%] top-28 hidden h-40 w-40 rounded-full bg-primary/[0.08] blur-2xl lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-4 pb-4 pt-24 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-20">
        <motion.div
          className="relative lg:col-span-6"
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={reduce ? undefined : heroOrchestration}
        >
          <div
            className="mb-6 h-1 w-12 rounded-full bg-primary"
            aria-hidden="true"
          />

          <motion.p
            variants={reduce ? undefined : heroItem}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-primary sm:text-xs"
          >
            {tagline}
          </motion.p>

          {/* Keep brand visible for LCP — no opacity:0 */}
          <h1 className="max-w-[12ch] text-heading">{siteName}</h1>

          <motion.p
            variants={reduce ? undefined : heroItem}
            className="text-body mt-6 max-w-[40ch] text-foreground/70"
          >
            {about}
          </motion.p>

          <motion.div
            variants={reduce ? undefined : heroItem}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row"
          >
            <Button href="/kegiatan" size="lg" className="w-full sm:w-auto">
              Lihat Kegiatan
            </Button>
            <Button href="/kontak" variant="outline" size="lg" className="w-full sm:w-auto">
              Gabung Bersama Kami
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-6"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <div className="relative mb-8 lg:mb-6 lg:ml-auto lg:max-w-md">
            <div
              className="absolute -inset-3 hidden rounded-rmi border border-primary/20 lg:block"
              aria-hidden="true"
            />
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-rmi bg-primary/10 sm:aspect-[5/6]"
              initial={reduce ? false : { scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 28rem"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-heading/35 via-transparent to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 left-3 z-10 max-w-[220px] rounded-rmi border border-foreground/10 bg-background/95 p-4 shadow-soft backdrop-blur-sm sm:-bottom-6 sm:left-4 lg:-left-10"
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <p className="font-display text-xl font-bold text-primary sm:text-2xl">{siteName}</p>
              <p className="text-caption mt-1 text-foreground/70">{tagline}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
