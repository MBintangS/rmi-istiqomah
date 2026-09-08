"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const NODE_POSITIONS = ["12%", "28%", "46%", "64%", "80%"] as const;

export function JejakRail() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });

  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-3 z-[1] hidden w-3 xl:block 2xl:left-6"
      aria-hidden="true"
    >
      <div className="relative mx-auto h-full w-px overflow-hidden bg-primary/15">
        {reduce ? (
          <div className="absolute inset-0 bg-secondary/70" />
        ) : (
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-secondary"
            style={{ scaleY }}
          />
        )}
      </div>

      {NODE_POSITIONS.map((top) => (
        <span
          key={top}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border border-secondary bg-background"
          style={{ top }}
        />
      ))}
    </div>
  );
}
