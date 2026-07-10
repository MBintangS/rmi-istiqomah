"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui";
import { useBanners } from "@/hooks/useBanners";
import { useSettingsValue } from "@/hooks/useSettings";
import { FALLBACK_HERO_IMAGE } from "@/lib/constants";
import { heroItem, heroOrchestration } from "@/lib/motion";

export function HeroSection() {
  const settings = useSettingsValue();
  const { data: banners } = useBanners();
  const reduce = useReducedMotion();

  const heroBanner = banners?.[0];
  // Keep local fallback as first paint for LCP; swap to CMS banner after hydrate.
  const heroImage = heroBanner?.image ?? FALLBACK_HERO_IMAGE;
  const heroAlt = heroBanner?.title ?? "Kegiatan remaja masjid";
  const { siteName, tagline, about, stats } = settings;

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-surface lg:block" aria-hidden="true" />
      <div className="absolute -right-24 top-24 hidden h-72 w-72 rounded-full bg-primary/10 blur-3xl lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-10 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-20">
        <motion.div
          className="lg:col-span-6"
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={reduce ? undefined : heroOrchestration}
        >
          <motion.p
            variants={reduce ? undefined : heroItem}
            className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-primary"
          >
            {tagline}
          </motion.p>
          {/* Keep brand/title visible for LCP — no opacity:0 */}
          <h1 className="max-w-[11ch] text-heading">{siteName}</h1>
          <motion.p
            variants={reduce ? undefined : heroItem}
            className="text-body mt-6 max-w-[38ch] text-foreground/75"
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
          initial={reduce ? false : { x: 40 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-rmi sm:aspect-[5/6] lg:ml-auto lg:max-w-lg"
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-heading/50 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            className="absolute -bottom-6 left-4 hidden max-w-[220px] rounded-rmi border border-foreground/10 bg-background p-4 shadow-soft sm:block lg:-left-10"
            initial={reduce ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            <p className="font-display text-2xl font-bold text-primary">{stats.establishedYear}</p>
            <p className="text-caption mt-1 text-foreground/70">{tagline}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
