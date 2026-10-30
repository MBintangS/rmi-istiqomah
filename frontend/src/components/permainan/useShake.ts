"use client";

import { useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

/** Gentle side-to-side wobble each time `signal` increases. No-op with reduced motion. */
export function useShake(signal: number) {
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (signal === 0 || reduce) return;
    void controls.start({ x: [0, -9, 9, -5, 5, 0], transition: { duration: 0.42 } });
  }, [signal, reduce, controls]);

  return controls;
}
