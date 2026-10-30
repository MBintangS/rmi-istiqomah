import { KATA_ISLAM } from "@/data/permainan/kata";
import { shuffle } from "@/components/permainan/random";
import type { PermainanLane } from "@/types/permainan";

export interface Cell {
  r: number;
  c: number;
}

export interface PlacedWord {
  word: string;
  cells: Cell[];
}

export interface KataBoard {
  size: number;
  grid: string[][];
  words: PlacedWord[];
}

interface LevelConfig {
  size: number;
  count: number;
  min: number;
  max: number;
}

export const KATA_LEVEL: Record<PermainanLane, LevelConfig> = {
  mudah: { size: 8, count: 5, min: 3, max: 5 },
  sedang: { size: 10, count: 6, min: 4, max: 7 },
  sulit: { size: 12, count: 7, min: 5, max: 9 },
};

/** Kiri ke kanan, atas ke bawah, miring ke bawah, dan miring ke kanan atas. */
const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
];

const FILLER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function cellKey(cell: Cell) {
  return `${cell.r}-${cell.c}`;
}

function fits(grid: string[][], word: string, start: Cell, dir: readonly [number, number]): Cell[] | null {
  const size = grid.length;
  const cells: Cell[] = [];
  for (let i = 0; i < word.length; i += 1) {
    const r = start.r + dir[0] * i;
    const c = start.c + dir[1] * i;
    if (r < 0 || c < 0 || r >= size || c >= size) return null;
    const existing = grid[r][c];
    if (existing && existing !== word[i]) return null;
    cells.push({ r, c });
  }
  return cells;
}

function placeWord(grid: string[][], word: string): Cell[] | null {
  const size = grid.length;
  const starts: Cell[] = [];
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) starts.push({ r, c });
  }
  const order = shuffle(starts);
  for (const dir of shuffle(DIRECTIONS)) {
    for (const start of order) {
      const cells = fits(grid, word, start, dir);
      if (!cells) continue;
      cells.forEach((cell, index) => {
        grid[cell.r][cell.c] = word[index];
      });
      return cells;
    }
  }
  return null;
}

export function createKataBoard(level: PermainanLane): KataBoard {
  const config = KATA_LEVEL[level];
  const pool = KATA_ISLAM.filter((word) => word.length >= config.min && word.length <= config.max);

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const chosen = shuffle(pool)
      .slice(0, config.count)
      .sort((a, b) => b.length - a.length);
    const grid = Array.from({ length: config.size }, () => Array<string>(config.size).fill(""));
    const placed: PlacedWord[] = [];
    let ok = true;
    for (const word of chosen) {
      const cells = placeWord(grid, word);
      if (!cells) {
        ok = false;
        break;
      }
      placed.push({ word, cells });
    }
    if (!ok) continue;

    for (let r = 0; r < config.size; r += 1) {
      for (let c = 0; c < config.size; c += 1) {
        if (!grid[r][c]) grid[r][c] = FILLER[Math.floor(Math.random() * FILLER.length)];
      }
    }
    return { size: config.size, grid, words: shuffle(placed) };
  }

  throw new Error("Kotak kata tidak tersusun.");
}

/** Snap a drag to the nearest straight line: sideways, down, or diagonal. */
export function lineBetween(start: Cell, end: Cell, size: number): Cell[] {
  const dr = end.r - start.r;
  const dc = end.c - start.c;
  if (dr === 0 && dc === 0) return [start];

  const adr = Math.abs(dr);
  const adc = Math.abs(dc);
  let stepR = 0;
  let stepC = 0;
  if (adr > adc * 2) stepR = Math.sign(dr);
  else if (adc > adr * 2) stepC = Math.sign(dc);
  else {
    stepR = Math.sign(dr);
    stepC = Math.sign(dc);
  }

  const length = stepR === 0 ? adc : stepC === 0 ? adr : Math.min(adr, adc);
  const cells: Cell[] = [];
  for (let i = 0; i <= length; i += 1) {
    const r = start.r + stepR * i;
    const c = start.c + stepC * i;
    if (r < 0 || c < 0 || r >= size || c >= size) break;
    cells.push({ r, c });
  }
  return cells;
}

export function lettersOf(grid: string[][], cells: Cell[]): string {
  return cells.map((cell) => grid[cell.r][cell.c]).join("");
}

export function matchKata(letters: string, words: readonly string[]): string | null {
  return words.find((word) => word === letters) ?? null;
}

export function sameCell(a: Cell, b: Cell) {
  return a.r === b.r && a.c === b.c;
}

export { cellKey };
