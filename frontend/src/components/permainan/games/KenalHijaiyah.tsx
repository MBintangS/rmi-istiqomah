"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { pickOne, shuffle } from "@/components/permainan/random";
import { useShake } from "@/components/permainan/useShake";
import { HURUF_HIJAIYAH } from "@/data/permainan/hijaiyah";
import { cn } from "@/lib/utils";
import type { HurufHijaiyah, PermainanInfo } from "@/types/permainan";

const ROUNDS = 8;
/** From this round on, one decoy is the reading of a look-alike letter (ب Ba vs ت Ta). */
const SIBLING_FROM_ROUND = 4;
const ADVANCE_MS = 1100;

interface Round {
  target: HurufHijaiyah;
  /** Glyphs whose readings are offered as answers. */
  options: string[];
}

const NAME_BY_GLYPH = new Map(HURUF_HIJAIYAH.map((h) => [h.glyph, h.name]));

function buildRounds(): Round[] {
  return shuffle(HURUF_HIJAIYAH)
    .slice(0, ROUNDS)
    .map((target, index) => {
      const decoys: string[] = [];
      if (index >= SIBLING_FROM_ROUND && target.siblings?.length) {
        decoys.push(pickOne(target.siblings));
      }
      // ح and ه are both read "Ha", so two options may never share a reading.
      const usedNames = () => new Set([target.name, ...decoys.map((g) => NAME_BY_GLYPH.get(g))]);
      while (decoys.length < 2) {
        const pool = HURUF_HIJAIYAH.filter((h) => !usedNames().has(h.name));
        decoys.push(pickOne(pool).glyph);
      }
      return { target, options: shuffle([target.glyph, ...decoys]) };
    });
}

function ReadingTile({
  glyph,
  state,
  onPick,
}: {
  glyph: string;
  state: "idle" | "wrong" | "right" | "locked";
  onPick: (glyph: string) => boolean;
}) {
  const [shakeSignal, setShakeSignal] = useState(0);
  const controls = useShake(shakeSignal);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (state === "right" && !reduce) {
      void controls.start({ scale: [1, 1.14, 1], transition: { duration: 0.4 } });
    }
  }, [state, reduce, controls]);

  return (
    <motion.button
      type="button"
      animate={controls}
      whileTap={reduce || state !== "idle" ? undefined : { scale: 0.94 }}
      disabled={state !== "idle"}
      onClick={() => {
        if (!onPick(glyph)) setShakeSignal((n) => n + 1);
      }}
      className={cn(
        "relative flex min-h-24 items-center justify-center rounded-[1.75rem] border-2 px-2 font-play text-3xl font-semibold leading-none transition-colors duration-200 sm:min-h-28 sm:text-4xl",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60",
        state === "idle" && "cursor-pointer border-foreground/10 bg-surface text-heading shadow-soft hover:border-secondary",
        state === "wrong" && "border-transparent bg-surface/60 text-foreground/25",
        state === "right" && "border-primary bg-primary text-white",
        state === "locked" && "border-transparent bg-surface/60 text-foreground/25",
      )}
    >
      {NAME_BY_GLYPH.get(glyph)}
    </motion.button>
  );
}

export function KenalHijaiyah({ game }: { game: PermainanInfo }) {
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [feedback, setFeedback] = useState("");
  const timer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const start = useCallback(() => {
    setRounds(buildRounds());
    setIndex(0);
    setWrong([]);
    setSolved(false);
    setFirstTry(0);
    setFeedback("");
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [start]);

  if (!rounds) {
    return <GameShell game={game}>{null}</GameShell>;
  }

  const finished = index >= rounds.length;
  if (finished) {
    return (
      <GameShell game={game}>
        <GameResult
          correct={firstTry}
          total={rounds.length}
          scoreLabel={`${firstTry} dari ${rounds.length} huruf dibaca benar di tebakan pertama.`}
          onReplay={start}
        />
      </GameShell>
    );
  }

  const round = rounds[index];

  const pick = (glyph: string) => {
    if (solved) return true;
    if (glyph !== round.target.glyph) {
      setWrong((prev) => [...prev, glyph]);
      setFeedback("Hampir! Itu cara baca huruf lain. Lihat lagi titiknya.");
      return false;
    }
    setSolved(true);
    if (wrong.length === 0) setFirstTry((n) => n + 1);
    setFeedback(`Benar, ini huruf ${round.target.name}!`);
    timer.current = window.setTimeout(() => {
      setIndex((i) => i + 1);
      setWrong([]);
      setSolved(false);
      setFeedback("");
    }, ADVANCE_MS);
    return true;
  };

  return (
    <GameShell game={game} step={index} total={rounds.length}>
      <div className="flex flex-col items-center text-center">
        <p className="font-play text-xl font-medium text-heading sm:text-2xl">Huruf ini dibaca apa?</p>

        <motion.div
          key={round.target.glyph}
          initial={reduce ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative mt-5 flex h-48 w-40 items-center justify-center rounded-b-[1.5rem] rounded-t-[999px] bg-secondary text-ink shadow-soft sm:h-56 sm:w-48"
        >
          <span
            className="pointer-events-none absolute inset-2.5 rounded-b-[1.1rem] rounded-t-[999px] border-2 border-ink/15"
            aria-hidden="true"
          />
          <span dir="rtl" lang="ar" className="font-arabic text-[6.5rem] leading-none sm:text-[8rem]">
            {round.target.glyph}
          </span>
        </motion.div>


        <div className="mt-7 grid w-full max-w-md grid-cols-3 gap-3 sm:gap-4">
          {round.options.map((glyph) => (
            <ReadingTile
              key={`${index}-${glyph}`}
              glyph={glyph}
              onPick={pick}
              state={
                solved
                  ? glyph === round.target.glyph
                    ? "right"
                    : "locked"
                  : wrong.includes(glyph)
                    ? "wrong"
                    : "idle"
              }
            />
          ))}
        </div>

        <p className="mt-5 min-h-7 font-play text-lg font-medium text-heading" aria-live="polite">
          {feedback}
        </p>
      </div>
    </GameShell>
  );
}
