"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { shuffle } from "@/components/permainan/random";
import { Button } from "@/components/ui";
import { SOAL_KUIS } from "@/data/permainan/kuis";
import { cn } from "@/lib/utils";
import type { PermainanInfo, SoalKuis } from "@/types/permainan";

const QUESTIONS_PER_ROUND = 5;
const SECONDS_PER_QUESTION = 20;
const CATEGORIES = Array.from(new Set(SOAL_KUIS.map((q) => q.category)));

type Phase = "intro" | "playing" | "done";
/** null = waktu habis */
type Answer = number | null | undefined;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}

function TimerSwitch({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-surface px-5 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
    >
      <span>
        <span className="block font-medium text-heading">Pakai waktu</span>
        <span className="block text-sm text-foreground/65">{SECONDS_PER_QUESTION} detik per soal, biar makin menantang.</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-primary" : "bg-foreground/20",
        )}
      >
        <span
          className={cn(
            "absolute left-1 top-1 h-6 w-6 rounded-full bg-background shadow-sm transition-transform duration-200",
            checked && "translate-x-6",
          )}
        />
      </span>
    </button>
  );
}

export function KuisLimaMenit({ game }: { game: PermainanInfo }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [timed, setTimed] = useState(false);
  const [questions, setQuestions] = useState<SoalKuis[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(undefined);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const nextRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const begin = useCallback(() => {
    setQuestions(shuffle(SOAL_KUIS).slice(0, QUESTIONS_PER_ROUND));
    setIndex(0);
    setAnswer(undefined);
    setScore(0);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setPhase("playing");
  }, []);

  const answered = answer !== undefined;

  useEffect(() => {
    if (phase !== "playing" || !timed || answered) return;
    if (secondsLeft <= 0) {
      setAnswer(null);
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, timed, answered, secondsLeft]);

  useEffect(() => {
    if (answered) nextRef.current?.focus();
  }, [answered]);

  if (phase === "intro") {
    return (
      <GameShell game={game}>
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <p className="font-play text-[5.5rem] font-bold leading-none text-primary sm:text-[7rem]">5</p>
          <p className="font-play text-2xl font-semibold text-heading">soal, satu putaran</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Kategori soal">
            {CATEGORIES.map((category) => (
              <li key={category} className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-foreground/80">
                {category}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base text-foreground/75">
            Salah tidak apa-apa. Setiap jawaban ada penjelasannya, jadi kamu tetap belajar.
          </p>
          <div className="mt-6 w-full">
            <TimerSwitch checked={timed} onToggle={() => setTimed((t) => !t)} />
          </div>
          <Button size="lg" className="mt-6 min-h-14 w-full font-play text-lg" onClick={begin}>
            Mulai kuis
          </Button>
        </div>
      </GameShell>
    );
  }

  if (phase === "done") {
    return (
      <GameShell game={game}>
        <GameResult
          correct={score}
          total={questions.length}
          scoreLabel={`${score} dari ${questions.length} soal dijawab benar.`}
          onReplay={begin}
        />
      </GameShell>
    );
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;

  const choose = (optionIndex: number) => {
    if (answered) return;
    setAnswer(optionIndex);
    if (optionIndex === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(undefined);
    setSecondsLeft(SECONDS_PER_QUESTION);
  };

  const verdict =
    answer === null
      ? "Waktunya habis."
      : answer === question.answer
        ? "Benar!"
        : "Belum tepat.";

  return (
    <GameShell game={game} step={index} total={questions.length}>
      <motion.div
        key={question.id}
        initial={reduce ? false : { x: 24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-background px-3 py-1 text-sm font-medium text-primary">
            {question.category}
          </span>
          {timed ? (
            <span
              className={cn(
                "font-play text-lg font-semibold tabular-nums",
                secondsLeft <= 5 && !answered ? "text-error" : "text-foreground/70",
              )}
              aria-label={`Sisa ${secondsLeft} detik`}
            >
              {answered ? "" : `${secondsLeft} dtk`}
            </span>
          ) : null}
        </div>

        {timed ? (
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-background" aria-hidden="true">
            <div
              className="h-full rounded-full bg-secondary transition-[width] duration-1000 ease-linear"
              style={{ width: `${(secondsLeft / SECONDS_PER_QUESTION) * 100}%` }}
            />
          </div>
        ) : null}

        <h2 className="mt-5 font-play text-2xl font-semibold leading-snug tracking-normal sm:text-3xl">
          {question.question}
        </h2>

        <div className="mt-6 grid gap-3">
          {question.options.map((option, i) => {
            const isCorrect = i === question.answer;
            const isChosen = answer === i;
            return (
              <button
                key={option}
                type="button"
                disabled={answered}
                onClick={() => choose(i)}
                className={cn(
                  "flex min-h-16 items-center justify-between gap-3 rounded-2xl border-2 px-5 py-3 text-left font-play text-lg font-medium transition-colors duration-200 sm:text-xl",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60",
                  !answered && "cursor-pointer border-foreground/10 bg-surface text-heading hover:border-primary",
                  answered && isCorrect && "border-primary bg-primary text-white",
                  answered && isChosen && !isCorrect && "border-error/40 bg-error/10 text-heading",
                  answered && !isChosen && !isCorrect && "border-transparent bg-surface/60 text-foreground/45",
                )}
              >
                <span>{option}</span>
                {answered && isCorrect ? <CheckIcon /> : null}
                {answered && isChosen && !isCorrect ? (
                  <span className="text-error">
                    <CrossIcon />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {answered ? (
            <motion.div
              initial={reduce ? false : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 rounded-2xl border-l-4 border-secondary bg-background px-5 py-4"
            >
              <p className="font-play text-lg font-semibold text-heading">{verdict}</p>
              <p className="mt-1 text-base text-foreground/80">{question.explanation}</p>
            </motion.div>
          ) : null}
        </div>

        {answered ? (
          <Button ref={nextRef} size="lg" className="mt-6 min-h-14 w-full font-play text-lg" onClick={next}>
            {isLast ? "Lihat hasil" : "Soal berikutnya"}
          </Button>
        ) : null}
      </motion.div>
    </GameShell>
  );
}
