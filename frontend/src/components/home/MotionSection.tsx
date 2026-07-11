"use client";

import { useEffect, useState } from "react";
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

/** If whileInView never fires (mobile IO / overflow quirks), reveal anyway. */
const IN_VIEW_FALLBACK_MS = 900;

export function MotionSection({
  children,
  className,
  tone = "soft",
  id,
}: MotionSectionProps) {
  const reduce = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    if (reduce || tone === "none") return;
    const timer = window.setTimeout(() => setForceVisible(true), IN_VIEW_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [reduce, tone]);

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
      animate={forceVisible ? "visible" : undefined}
      viewport={defaultViewport}
      variants={toneVariants[tone]}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
