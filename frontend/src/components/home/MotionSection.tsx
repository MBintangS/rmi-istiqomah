"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { defaultViewport, slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
}

export function MotionSection({ children, className, ...props }: MotionSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={slideUp}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
