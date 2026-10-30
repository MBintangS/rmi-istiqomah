"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { KhatamStar } from "@/components/permainan/KhatamStar";
import { starsFor } from "@/components/permainan/random";
import { Button } from "@/components/ui";

interface GameResultProps {
  correct: number;
  total: number;
  scoreLabel: string;
  onReplay: () => void;
  children?: ReactNode;
}

const HEADLINES = ["", "Kamu sudah menyelesaikannya!", "Bagus sekali!", "MasyaAllah, sempurna!"];

export function GameResult({ correct, total, scoreLabel, onReplay, children }: GameResultProps) {
  const stars = starsFor(correct, total);
  const reduce = useReducedMotion();
  const replayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    replayRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center py-6 text-center sm:py-10" role="status">
      <div className="flex items-end gap-2 sm:gap-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className={i === 1 ? "-translate-y-3" : undefined}>
            <motion.span
              className="block"
              initial={reduce ? false : { scale: 0.3, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.15 + i * 0.22, type: "spring", stiffness: 260, damping: 14 }}
            >
              <KhatamStar
                filled={i < stars}
                className={i === 1 ? "h-20 w-20 sm:h-24 sm:w-24" : "h-14 w-14 sm:h-16 sm:w-16"}
              />
            </motion.span>
          </span>
        ))}
      </div>

      <h2 className="mt-6 font-play text-3xl font-semibold tracking-normal sm:text-4xl">{HEADLINES[stars]}</h2>
      <p className="mt-2 text-base text-foreground/75">{scoreLabel}</p>

      {children ? <div className="mt-6 w-full max-w-md">{children}</div> : null}

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Button ref={replayRef} size="lg" className="min-h-14 flex-1 font-play text-lg" onClick={onReplay}>
          Main lagi
        </Button>
        <Button href="/permainan" variant="outline" size="lg" className="min-h-14 flex-1 font-play text-lg">
          Pilih permainan lain
        </Button>
      </div>
    </div>
  );
}
