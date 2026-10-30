"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { LANE_ORDER, LANE_STYLES } from "@/components/permainan/lanes";
import {
  cellKey,
  createKataBoard,
  KATA_LEVEL,
  lettersOf,
  lineBetween,
  matchKata,
  sameCell,
  type Cell,
  type KataBoard,
} from "@/components/permainan/games/kataBoard";
import { useShake } from "@/components/permainan/useShake";
import { Button, Modal } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PermainanInfo, PermainanLane } from "@/types/permainan";

const ARAH_KATA = [
  { label: "Ke kanan", rotate: 0 },
  { label: "Ke bawah", rotate: 90 },
  { label: "Miring ke kanan bawah", rotate: 45 },
  { label: "Miring ke kiri bawah", rotate: 135 },
  { label: "Miring ke kanan atas", rotate: -45 },
] as const;

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ rotate }: { rotate: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaraBermain() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-center rounded-full px-3 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <InfoIcon />
        Cara bermain
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Cara bermain">
        <p className="text-sm text-foreground/75">
          Tahan huruf pertama, lalu tarik ke huruf terakhir. Hanya arah ini yang dihitung.
        </p>
        <ul className="mt-4 grid gap-2">
          {ARAH_KATA.map((arah) => (
            <li
              key={arah.label}
              className="flex min-h-12 items-center gap-3 rounded-2xl bg-surface px-3 py-2 text-heading"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ArrowIcon rotate={arah.rotate} />
              </span>
              <span className="font-play text-base font-semibold">{arah.label}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

function cellFromPoint(x: number, y: number): Cell | null {
  const target = document.elementFromPoint(x, y);
  const node = target instanceof Element ? target.closest("[data-cell]") : null;
  if (!node) return null;
  const r = Number(node.getAttribute("data-r"));
  const c = Number(node.getAttribute("data-c"));
  if (Number.isNaN(r) || Number.isNaN(c)) return null;
  return { r, c };
}

export function CariKata({ game }: { game: PermainanInfo }) {
  const [level, setLevel] = useState<PermainanLane>("mudah");
  const [board, setBoard] = useState<KataBoard | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [trail, setTrail] = useState<Cell[]>([]);
  const [anchor, setAnchor] = useState<Cell | null>(null);
  const [focus, setFocus] = useState<Cell>({ r: 0, c: 0 });
  const [note, setNote] = useState("");
  const [miss, setMiss] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<Cell[]>([]);
  const dragRef = useRef<{ start: Cell; moved: boolean } | null>(null);
  const focusRef = useRef<HTMLButtonElement>(null);
  const keyMoved = useRef(false);
  const shake = useShake(miss);

  const start = useCallback((next: PermainanLane) => {
    setLevel(next);
    setBoard(createKataBoard(next));
    setFound([]);
    setTrail([]);
    trailRef.current = [];
    setAnchor(null);
    setFocus({ r: 0, c: 0 });
    setNote("");
    dragRef.current = null;
  }, []);

  useEffect(() => {
    if (!keyMoved.current) return;
    keyMoved.current = false;
    focusRef.current?.focus();
  }, [focus]);

  const showTrail = useCallback((cells: Cell[]) => {
    trailRef.current = cells;
    setTrail(cells);
  }, []);

  const commit = useCallback(
    (cells: Cell[]) => {
      if (!board || cells.length < 2) {
        showTrail([]);
        return;
      }
      const letters = lettersOf(board.grid, cells);
      const word = matchKata(
        letters,
        board.words.map((item) => item.word),
      );
      if (!word) {
        setMiss((n) => n + 1);
        setNote("Belum ada kata di jalur itu. Tarik dari huruf pertama sampai terakhir.");
        showTrail([]);
        return;
      }
      if (found.includes(word)) {
        setNote(`${word.charAt(0)}${word.slice(1).toLowerCase()} sudah ketemu.`);
        showTrail([]);
        return;
      }
      const nextFound = [...found, word];
      setFound(nextFound);
      setNote(`${word.charAt(0)}${word.slice(1).toLowerCase()} ketemu.`);
      showTrail([]);
    },
    [board, found, showTrail],
  );

  const tap = useCallback(
    (cell: Cell) => {
      if (anchor && !sameCell(anchor, cell)) {
        commit(lineBetween(anchor, cell, board?.size ?? 0));
        setAnchor(null);
        return;
      }
      setAnchor(sameCell(anchor ?? cell, cell) && anchor ? null : cell);
      showTrail([cell]);
      setNote(anchor ? "" : "Sekarang pilih huruf terakhir.");
    },
    [anchor, board?.size, commit, showTrail],
  );

  if (!board) {
    return (
      <GameShell game={game}>
        <div className="mx-auto flex max-w-md flex-col">
          <p className="text-center font-play text-2xl font-semibold text-heading">Pilih tingkat dulu</p>
          <div className="mt-3 flex justify-center">
            <CaraBermain />
          </div>
          <div role="radiogroup" aria-label="Tingkat kesulitan" className="mt-6 grid gap-3">
            {LANE_ORDER.map((item) => {
              const style = LANE_STYLES[item];
              const config = KATA_LEVEL[item];
              const selected = level === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setLevel(item)}
                  className={cn(
                    "flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-foreground/10 bg-surface text-heading hover:border-primary hover:bg-primary/10",
                  )}
                >
                  <span>
                    <span className="block font-play text-xl font-semibold">{style.label}</span>
                    <span className={cn("block text-sm", selected ? "opacity-80" : "text-foreground/65")}>
                      {config.count} kata
                    </span>
                  </span>
                  <span className="font-play text-2xl font-bold tabular-nums">
                    {config.size}×{config.size}
                  </span>
                </button>
              );
            })}
          </div>
          <Button size="lg" className="mt-6 min-h-14 font-play text-lg" onClick={() => start(level)}>
            Mulai cari kata
          </Button>
        </div>
      </GameShell>
    );
  }

  const done = found.length === board.words.length;
  if (done) {
    return (
      <GameShell game={game}>
        <GameResult
          correct={board.words.length}
          total={board.words.length}
          scoreLabel={`Semua ${board.words.length} kata pada kotak ${board.size}×${board.size} ketemu.`}
          onReplay={() => start(level)}
        >
          <button
            type="button"
            onClick={() => setBoard(null)}
            className="min-h-11 cursor-pointer rounded-full px-3 font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ganti tingkat
          </button>
        </GameResult>
      </GameShell>
    );
  }

  const trailKeys = new Set(trail.map(cellKey));
  const foundKeys = new Set(
    board.words.filter((item) => found.includes(item.word)).flatMap((item) => item.cells.map(cellKey)),
  );
  const spelling = lettersOf(board.grid, trail);

  const moveFocus = (dr: number, dc: number) => {
    setFocus((prev) => ({
      r: Math.min(board.size - 1, Math.max(0, prev.r + dr)),
      c: Math.min(board.size - 1, Math.max(0, prev.c + dc)),
    }));
    keyMoved.current = true;
  };

  return (
    <GameShell game={game}>
      <div className="mx-auto flex w-full max-w-lg flex-col">
        <div className="mb-3 flex justify-center">
          <CaraBermain />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {board.words.map((item) => {
            const got = found.includes(item.word);
            return (
              <span
                key={item.word}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-play text-sm font-semibold tracking-wide",
                  got ? "bg-primary text-white" : "bg-surface text-heading",
                )}
              >
                {got ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                ) : null}
                {item.word.charAt(0)}
                {item.word.slice(1).toLowerCase()}
                {got ? <span className="sr-only">, ketemu</span> : null}
              </span>
            );
          })}
        </div>

        <p className="mt-4 min-h-9 text-center font-play text-2xl font-bold tracking-[0.25em] text-heading">
          {spelling}
        </p>

        <motion.div
          ref={gridRef}
          animate={shake}
          role="group"
          aria-label="Kotak huruf. Tarik dari huruf pertama ke huruf terakhir, atau pilih dua huruf dengan papan ketik."
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            const cell = cellFromPoint(event.clientX, event.clientY);
            if (!cell) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            dragRef.current = { start: cell, moved: false };
            showTrail([cell]);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag) return;
            const cell = cellFromPoint(event.clientX, event.clientY);
            if (!cell) return;
            if (!sameCell(cell, drag.start)) drag.moved = true;
            showTrail(lineBetween(drag.start, cell, board.size));
          }}
          onPointerUp={(event) => {
            const drag = dragRef.current;
            dragRef.current = null;
            if (!drag) return;
            const end = cellFromPoint(event.clientX, event.clientY) ?? trailRef.current.at(-1) ?? drag.start;
            if (!drag.moved) {
              tap(drag.start);
              return;
            }
            setAnchor(null);
            commit(lineBetween(drag.start, end, board.size));
          }}
          onPointerCancel={() => {
            dragRef.current = null;
            showTrail([]);
          }}
          onKeyDown={(event) => {
            const arrows: Record<string, [number, number]> = {
              ArrowUp: [-1, 0],
              ArrowDown: [1, 0],
              ArrowLeft: [0, -1],
              ArrowRight: [0, 1],
            };
            const step = arrows[event.key];
            if (step) {
              event.preventDefault();
              moveFocus(step[0], step[1]);
              return;
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              tap(focus);
            }
          }}
          className="touch-none select-none"
          style={{ display: "grid", gap: board.size > 8 ? 3 : 6, gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
        >
          {board.grid.map((row, r) =>
            row.map((letter, c) => {
              const key = cellKey({ r, c });
              const active = focus.r === r && focus.c === c;
              const onTrail = trailKeys.has(key);
              const solved = foundKeys.has(key);
              return (
                <button
                  key={key}
                  ref={active ? focusRef : undefined}
                  type="button"
                  tabIndex={active ? 0 : -1}
                  data-cell=""
                  data-r={r}
                  data-c={c}
                  aria-label={`${letter}, baris ${r + 1} kolom ${c + 1}`}
                  aria-pressed={onTrail || solved}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-md font-play font-bold leading-none",
                    board.size > 10 ? "text-sm sm:text-lg" : "text-base sm:text-xl",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading",
                    onTrail && "bg-secondary text-ink",
                    !onTrail && solved && "bg-primary text-white",
                    !onTrail && !solved && "bg-surface text-heading",
                    anchor && sameCell(anchor, { r, c }) && !onTrail && "ring-2 ring-secondary",
                  )}
                >
                  {letter}
                </button>
              );
            }),
          )}
        </motion.div>

        <p className="mt-4 min-h-6 text-center text-sm text-foreground/75" aria-live="polite">
          {note || "Tahan huruf pertama, lalu tarik ke huruf terakhir."}
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => start(level)}
            className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Acak ulang
          </button>
          <button
            type="button"
            onClick={() => setBoard(null)}
            className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-medium text-foreground/70 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ganti tingkat
          </button>
        </div>
      </div>
    </GameShell>
  );
}
