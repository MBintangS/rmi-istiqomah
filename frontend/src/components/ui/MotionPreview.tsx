"use client";

import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/lib/motion";

export function MotionPreview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <motion.div
        className="rounded-rmi bg-surface p-6 shadow-soft"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <p className="text-caption text-foreground/60">fadeIn</p>
        <p className="text-body mt-2 text-heading">Animasi fade halus saat muncul.</p>
      </motion.div>

      <motion.div
        className="rounded-rmi bg-surface p-6 shadow-soft"
        variants={slideUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      >
        <p className="text-caption text-foreground/60">slideUp</p>
        <p className="text-body mt-2 text-heading">Animasi slide dari bawah ke atas.</p>
      </motion.div>
    </div>
  );
}
