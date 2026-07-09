"use client";

import Image from "next/image";
import { useState } from "react";
import { MotionSection } from "@/components/home/MotionSection";
import { mockTestimoni } from "@/data/mock";
import { cn } from "@/lib/utils";

const testimonials = mockTestimoni.filter((item) => item.isActive).sort((a, b) => a.order - b.order);

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];
  const quote =
    current.content.length > 180 ? `${current.content.slice(0, 177).trim()}...` : current.content;

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <MotionSection tone="fade" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="max-w-[12ch]">Kata Mereka tentang RMI</h2>
          <figure className="mt-10">
            <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight text-heading sm:text-2xl md:text-3xl md:leading-[1.15]">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                {current.photo ? (
                  <Image
                    src={current.photo}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                    {current.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-heading">{current.name}</p>
                <p className="text-caption text-foreground/60">{current.role}</p>
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
        </div>
      </div>
    </MotionSection>
  );
}
