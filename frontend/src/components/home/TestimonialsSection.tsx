"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { EmptyState, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useTestimoni } from "@/hooks/useTestimoni";
import { getApiErrorMessage } from "@/lib/api";
import { mapTestimoniListItem } from "@/lib/mappers/testimoni";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const { data, isPending, isError, error } = useTestimoni();
  const testimonials = useMemo(
    () => (data ?? []).map(mapTestimoniListItem).sort((a, b) => a.order - b.order),
    [data],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const current = testimonials[activeIndex];
  const quote = current
    ? current.content.length > 180
      ? `${current.content.slice(0, 177).trim()}...`
      : current.content
    : "";

  const goTo = (index: number) => {
    if (testimonials.length === 0) return;
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <MotionSection tone="fade" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="max-w-[12ch]">Kata Mereka tentang RMI</h2>

          {isPending ? (
            <div className="mt-10 space-y-4">
              <Skeleton variant="text" lines={3} />
              <Skeleton className="h-12 w-48 rounded-rmi" />
            </div>
          ) : isError ? (
            <EmptyState
              title="Gagal memuat testimoni"
              description={getApiErrorMessage(error)}
            />
          ) : !current ? (
            <EmptyState
              title="Belum ada testimoni"
              description="Testimoni anggota RMI akan tampil di sini."
            />
          ) : (
            <>
              <figure className="mt-10">
                <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight text-heading sm:text-2xl md:text-3xl md:leading-[1.15]">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                    <Image
                      src={current.photo || PLACEHOLDER_IMAGE}
                      alt={current.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-heading">{current.name}</p>
                    {current.role && (
                      <p className="text-caption text-foreground/70">{current.role}</p>
                    )}
                  </div>
                </figcaption>
              </figure>

              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Testimoni sebelumnya"
                >
                  ←
                </button>
                <div className="flex gap-2" role="tablist" aria-label="Pilih testimoni">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Testimoni ${index + 1}: ${item.name}`}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        index === activeIndex ? "bg-primary" : "bg-foreground/20 hover:bg-foreground/40",
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Testimoni berikutnya"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </MotionSection>
  );
}
