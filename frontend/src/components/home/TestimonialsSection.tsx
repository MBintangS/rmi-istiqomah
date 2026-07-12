"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { EmptyState, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useTestimoni } from "@/hooks/useTestimoni";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapTestimoniListItem } from "@/lib/mappers/testimoni";
import { cn } from "@/lib/utils";

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "prev" ? "rotate-180" : undefined}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function TestimonialsSection() {
  const { data, isPending, isError, error } = useTestimoni();
  const prefersReduced = useReducedMotion();
  const testimonials = useMemo(
    () => (data ?? []).map(mapTestimoniListItem).sort((a, b) => a.order - b.order),
    [data],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((index) => Math.min(index, testimonials.length - 1));
  }, [testimonials.length]);

  const current = testimonials[activeIndex];
  const total = testimonials.length;

  const goTo = (index: number) => {
    if (total === 0) return;
    setActiveIndex((index + total) % total);
  };

  return (
    <MotionSection
      tone="fade"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            Kata Mereka
          </p>
          <h2 className="mt-3 max-w-[16ch]">Suara yang tumbuh bersama</h2>
          <p className="text-body mt-4 max-w-[42ch] text-foreground/65">
            Pengalaman anggota, sahabat, dan teman-teman yang ikut tumbuh di wilayah Masjid Al-Istiqomah.
          </p>
        </header>

        {isPending ? (
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="mx-auto aspect-[4/5] w-full max-w-[5.5rem] animate-pulse rounded-rmi bg-foreground/10 sm:max-w-[6.5rem] lg:col-span-2 lg:mx-0 lg:max-w-[7rem]" />
            <div className="space-y-4 lg:col-span-10">
              <Skeleton variant="text" lines={4} />
              <Skeleton className="h-14 w-56 rounded-rmi" />
            </div>
          </div>
        ) : isError ? (
          <div className="mt-14">
            <EmptyState
              title="Gagal memuat testimoni"
              description={getApiErrorMessage(error)}
            />
          </div>
        ) : !current ? (
          <div className="mt-14">
            <EmptyState
              title="Belum ada testimoni"
              description="Testimoni anggota RMI akan tampil di sini."
            />
          </div>
        ) : (
          <div className="mt-14">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="relative lg:col-span-2">
                <div className="relative aspect-[4/5] w-full max-w-[5rem] overflow-hidden rounded-rmi bg-primary/10 sm:max-w-[6rem] lg:mx-0 lg:max-w-[6.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      className="absolute inset-0"
                      initial={prefersReduced ? false : { opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={current.photo || PLACEHOLDER_IMAGE}
                        alt={current.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                        priority={activeIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative min-w-0 lg:col-span-10">
                <span
                  className="pointer-events-none absolute -left-2 -top-8 font-display text-[7rem] leading-none text-primary/15 select-none sm:-top-10 sm:text-[9rem]"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={current.id}
                    initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight text-heading sm:text-2xl md:text-[1.75rem] md:leading-[1.25]">
                      {current.content}
                    </blockquote>

                    <figcaption className="mt-8 border-t border-foreground/10 pt-6">
                      <p className="font-display text-lg font-semibold text-heading">
                        {current.name}
                      </p>
                      {current.role ? (
                        <p className="mt-0.5 text-sm text-foreground/60">{current.role}</p>
                      ) : null}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            {total > 1 ? (
              <div className="mt-12 flex items-center gap-3 sm:gap-4">
                <div
                  className="min-w-0 flex-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  role="tablist"
                  aria-label="Pilih testimoni"
                >
                  <div className="flex items-center -space-x-2 px-1">
                    {testimonials.map((item, index) => {
                      const active = index === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={`Testimoni ${index + 1}: ${item.name}`}
                          title={item.name}
                          onClick={() => setActiveIndex(index)}
                          className={cn(
                            "relative h-12 w-12 shrink-0 rounded-full bg-primary/10 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            active
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : "opacity-55 hover:opacity-100",
                          )}
                        >
                          <span className="absolute inset-0 overflow-hidden rounded-full">
                            <Image
                              src={item.photo || PLACEHOLDER_IMAGE}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <p className="mr-1 hidden text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/45 sm:block">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </p>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-rmi border border-foreground/12 text-heading transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Testimoni sebelumnya"
                  >
                    <Chevron direction="prev" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-rmi border border-foreground/12 text-heading transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Testimoni berikutnya"
                  >
                    <Chevron direction="next" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
