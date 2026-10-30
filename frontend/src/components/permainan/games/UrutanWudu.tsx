"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { shuffle } from "@/components/permainan/random";
import { useShake } from "@/components/permainan/useShake";
import { LANGKAH_WUDU } from "@/data/permainan/wudu";
import { cn } from "@/lib/utils";
import type { LangkahWudu, PermainanInfo } from "@/types/permainan";

/** After this many misses on one step, the correct card glows as a hint. */
const HINT_AFTER = 2;

const POSITION = new Map(LANGKAH_WUDU.map((step, i) => [step.id, i]));

function StepCard({
  step,
  hinted,
  onPick,
}: {
  step: LangkahWudu;
  hinted: boolean;
  onPick: (id: string) => boolean;
}) {
  const [shakeSignal, setShakeSignal] = useState(0);
  const controls = useShake(shakeSignal);
  const reduce = useReducedMotion();

  return (
    <motion.button
      layout={!reduce}
      type="button"
      animate={controls}
      exit={reduce ? undefined : { scale: 0.8, opacity: 0, transition: { duration: 0.18 } }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      onClick={() => {
        if (!onPick(step.id)) setShakeSignal((n) => n + 1);
      }}
      className={cn(
        "flex min-h-20 cursor-pointer items-center justify-center rounded-3xl border-2 bg-surface px-4 py-4 text-center text-heading shadow-soft transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60",
        hinted ? "border-secondary ring-4 ring-secondary/40" : "border-foreground/10 hover:border-secondary",
      )}
    >
      <span className="text-sm font-medium leading-snug sm:text-base">{step.label}</span>
    </motion.button>
  );
}

export function UrutanWudu({ game }: { game: PermainanInfo }) {
  const [pool, setPool] = useState<LangkahWudu[] | null>(null);
  const [placed, setPlaced] = useState(0);
  const [missesOnStep, setMissesOnStep] = useState(0);
  const [cleanSteps, setCleanSteps] = useState(0);
  const [feedback, setFeedback] = useState("");
  const reduce = useReducedMotion();

  const start = useCallback(() => {
    setPool(shuffle(LANGKAH_WUDU));
    setPlaced(0);
    setMissesOnStep(0);
    setCleanSteps(0);
    setFeedback("");
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  if (!pool) return <GameShell game={game}>{null}</GameShell>;

  const total = LANGKAH_WUDU.length;

  if (placed >= total) {
    return (
      <GameShell game={game}>
        <GameResult
          correct={cleanSteps}
          total={total}
          scoreLabel={`${cleanSteps} dari ${total} langkah tepat tanpa salah.`}
          onReplay={start}
        >
          <p className="rounded-2xl bg-surface px-5 py-4 text-sm text-foreground/80">
            Selesai wudu, jangan lupa membaca doa.{" "}
            <Link href="/ibadah/doa" className="font-medium text-primary underline-offset-4 hover:underline">
              Lihat doa setelah wudu
            </Link>
          </p>
        </GameResult>
      </GameShell>
    );
  }

  const nextStep = LANGKAH_WUDU[placed];

  const pick = (id: string) => {
    if (id === nextStep.id) {
      if (missesOnStep === 0) setCleanSteps((n) => n + 1);
      setPlaced((n) => n + 1);
      setMissesOnStep(0);
      setPool((prev) => prev?.filter((step) => step.id !== id) ?? prev);
      setFeedback(placed + 1 < total ? `Benar! Sekarang langkah ke-${placed + 2}.` : "MasyaAllah, wudunya lengkap!");
      return true;
    }
    const misses = missesOnStep + 1;
    setMissesOnStep(misses);
    const position = (POSITION.get(id) ?? 0) + 1;
    setFeedback(
      misses >= HINT_AFTER
        ? "Coba kartu yang bersinar."
        : `Belum. Itu nanti, langkah ke-${position}. Cari langkah ke-${placed + 1} dulu.`,
    );
    return false;
  };

  return (
    <GameShell game={game} step={placed} total={total}>
      <ol className="grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Urutan wudu yang sudah tersusun">
        {LANGKAH_WUDU.map((step, i) => {
          const done = i < placed;
          const current = i === placed;
          return (
            <li
              key={step.id}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-2xl border-2 transition-colors duration-300",
                done && "border-primary bg-primary text-white",
                current && "border-dashed border-secondary bg-background",
                !done && !current && "border-dashed border-foreground/15 bg-background/50",
              )}
            >
              <span
                className={cn(
                  "absolute left-1.5 top-1 text-[11px] font-semibold tabular-nums",
                  done ? "text-white/80" : "text-foreground/45",
                )}
              >
                {i + 1}
              </span>
              {done ? (
                <motion.span
                  initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  <span className="sr-only">{step.label}</span>
                </motion.span>
              ) : (
                <span className="font-play text-lg text-foreground/30" aria-hidden="true">
                  ?
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-center font-play text-xl font-medium text-heading sm:text-2xl">
        Langkah ke-{placed + 1} itu yang mana?
      </p>
      <p className="mt-1 min-h-6 text-center text-base text-foreground/75" aria-live="polite">
        {feedback}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <AnimatePresence initial={false}>
          {pool.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              hinted={missesOnStep >= HINT_AFTER && step.id === nextStep.id}
              onPick={pick}
            />
          ))}
        </AnimatePresence>
      </div>
    </GameShell>
  );
}
