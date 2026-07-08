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

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  return (
    <MotionSection className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-caption font-medium text-primary">Testimoni</p>
          <h2>Kata Mereka tentang RMI</h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <figure className="rounded-rmi border border-foreground/10 bg-surface p-6 shadow-soft sm:p-10">
            <blockquote className="text-body text-center text-foreground/80">
              &ldquo;{current.content}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-primary/10">
                {current.photo ? (
                  <Image
                    src={current.photo}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-primary">
                    {current.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="font-semibold text-heading">{current.name}</p>
                <p className="text-caption text-foreground/60">{current.role}</p>
              </div>
            </figcaption>
          </figure>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-primary hover:text-primary"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-primary hover:text-primary"
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
