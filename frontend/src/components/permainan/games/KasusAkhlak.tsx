"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { shuffle } from "@/components/permainan/random";
import { Button } from "@/components/ui";
import { KASUS_AKHLAK } from "@/data/permainan/akhlak";
import { cn } from "@/lib/utils";
import type { KasusAkhlak as Kasus, PermainanInfo } from "@/types/permainan";

const CASES_PER_ROUND = 5;

function buildRound(): Kasus[] {
  return shuffle(KASUS_AKHLAK)
    .slice(0, CASES_PER_ROUND)
    .map((kasus) => ({ ...kasus, options: shuffle(kasus.options) }));
}

export function KasusAkhlak({ game }: { game: PermainanInfo }) {
  const [cases, setCases] = useState<Kasus[] | null>(null);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const nextRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const start = useCallback(() => {
    setCases(buildRound());
    setIndex(0);
    setChosen(null);
    setScore(0);
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (chosen !== null) nextRef.current?.focus();
  }, [chosen]);

  if (!cases) return <GameShell game={game}>{null}</GameShell>;

  if (index >= cases.length) {
    return (
      <GameShell game={game}>
        <GameResult
          correct={score}
          total={cases.length}
          scoreLabel={`${score} dari ${cases.length} kasus kamu pilih sikap terbaik.`}
          onReplay={start}
        />
      </GameShell>
    );
  }

  const kasus = cases[index];
  const picked = chosen !== null ? kasus.options[chosen] : null;
  const best = kasus.options.find((option) => option.best);

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (kasus.options[i].best) setScore((s) => s + 1);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setChosen(null);
  };

  return (
    <GameShell game={game} step={index} total={cases.length}>
      <motion.div
        key={kasus.id}
        initial={reduce ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 pb-7 pt-6 text-on-ink sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Situasi</p>
          <p className="mt-3 font-play text-xl font-medium leading-snug sm:text-2xl">{kasus.situation}</p>
          <span
            className="absolute -bottom-3 right-8 h-6 w-6 rotate-45 bg-secondary"
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 font-play text-lg font-medium text-heading">Apa sikap terbaikmu?</p>

        <div className="mt-3 grid gap-3">
          {kasus.options.map((option, i) => {
            const isChosen = chosen === i;
            const revealBest = chosen !== null && option.best;
            return (
              <button
                key={option.text}
                type="button"
                disabled={chosen !== null}
                onClick={() => choose(i)}
                className={cn(
                  "min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-base font-medium leading-snug transition-colors duration-200 sm:text-lg",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60",
                  chosen === null && "cursor-pointer border-foreground/10 bg-surface text-heading hover:border-primary",
                  revealBest && "border-primary bg-primary text-white",
                  isChosen && !option.best && "border-secondary bg-secondary/20 text-heading",
                  chosen !== null && !isChosen && !option.best && "border-transparent bg-surface/60 text-foreground/45",
                )}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {picked ? (
            <motion.div
              initial={reduce ? false : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 space-y-3 rounded-2xl bg-background px-5 py-5"
            >
              <p className="font-play text-lg font-semibold text-heading">
                {picked.best ? "Pilihan terbaik!" : "Ada pilihan yang lebih baik."}
              </p>
              <p className="text-base text-foreground/80">{picked.feedback}</p>
              {!picked.best && best ? (
                <p className="text-base text-foreground/80">
                  <span className="font-medium text-primary">Lebih baik: </span>
                  {best.text} {best.feedback}
                </p>
              ) : null}
              <p className="border-l-4 border-secondary pl-3 text-sm text-foreground/70">{kasus.source}</p>
            </motion.div>
          ) : null}
        </div>

        {picked ? (
          <Button ref={nextRef} size="lg" className="mt-6 min-h-14 w-full font-play text-lg" onClick={next}>
            {index === cases.length - 1 ? "Lihat hasil" : "Kasus berikutnya"}
          </Button>
        ) : null}
      </motion.div>
    </GameShell>
  );
}
