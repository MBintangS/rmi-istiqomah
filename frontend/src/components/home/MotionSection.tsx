"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { defaultViewport, fadeIn, softRise, slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionTone = "slide" | "fade" | "soft" | "none";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  tone?: MotionTone;
  id?: string;
}

const toneVariants: Record<Exclude<MotionTone, "none">, Variants> = {
  slide: slideUp,
  fade: fadeIn,
  soft: softRise,
};

export function MotionSection({
  children,
  className,
  tone = "soft",
  id,
}: MotionSectionProps) {
  const reduce = useReducedMotion();

  if (tone === "none" || reduce) {
    return (
      <section id={id} className={cn(className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={toneVariants[tone]}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
