"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameResult } from "@/components/permainan/GameResult";
import { GameShell } from "@/components/permainan/GameShell";
import { KhatamStar } from "@/components/permainan/KhatamStar";
import { LANE_ORDER, LANE_STYLES } from "@/components/permainan/lanes";
import { shuffle } from "@/components/permainan/random";
import { Button } from "@/components/ui";
import { ASMAUL_HUSNA } from "@/data/belajar/asmaul-husna";
import { cn } from "@/lib/utils";
import type { AsmaulHusna } from "@/types/belajar";
import type { PermainanInfo, PermainanLane } from "@/types/permainan";

interface Kartu {
  id: string;
  jenis: "arab" | "arti";
  nama: AsmaulHusna;
}

/** `pool`: nama diambil dari urutan awal, yang lebih sering didengar anak, untuk tingkat yang lebih mudah. */
const LEVEL: Record<PermainanLane, { pairs: number; ukuran: string; pool: number; cols: string }> = {
  mudah: { pairs: 6, ukuran: "4×3", pool: 33, cols: "grid-cols-3 sm:grid-cols-4" },
  sedang: { pairs: 8, ukuran: "4×4", pool: 66, cols: "grid-cols-4" },
  sulit: { pairs: 12, ukuran: "6×4", pool: 99, cols: "grid-cols-4 sm:grid-cols-6" },
};

const TUTUP_MS = 1000;
/** Sama dengan durasi animasi balik kartu, supaya isi kartu tidak hilang sebelum kartu tertutup. */
const BALIK_MS = 500;

/** Arti yang mirip (Pengampun dan Pemberi Pengampunan) tidak boleh muncul di papan yang sama. */
function kataKunci(arti: string) {
  return (arti.toLowerCase().split(" ").at(-1) ?? "").replace(/an$/, "");
}

function buatPapan(level: PermainanLane): Kartu[] {
  const { pairs, pool } = LEVEL[level];
  const kunci = new Set<string>();
  const terpilih: AsmaulHusna[] = [];
  for (const nama of shuffle(ASMAUL_HUSNA.slice(0, pool))) {
    const k = kataKunci(nama.arti);
    if (kunci.has(k)) continue;
    kunci.add(k);
    terpilih.push(nama);
    if (terpilih.length === pairs) break;
  }
  return shuffle(
    terpilih.flatMap((nama) => [
      { id: `${nama.nomor}-arab`, jenis: "arab" as const, nama },
      { id: `${nama.nomor}-arti`, jenis: "arti" as const, nama },
    ]),
  );
}

function pecahArti(arti: string): [string | null, string] {
  const match = arti.match(/^(Yang Maha|Yang)\s+(.+)$/);
  return match ? [match[1], match[2]] : [null, arti];
}

function MukaKartu({ kartu, cocok, kecil }: { kartu: Kartu; cocok: boolean; kecil: boolean }) {
  if (kartu.jenis === "arab") {
    return (
      <>
        <span lang="ar" dir="rtl" className={cn("font-arabic leading-[1.6] text-heading", kecil ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl")}>
          {kartu.nama.arab}
        </span>
        {cocok ? <span className="mt-0.5 font-play text-[11px] font-semibold text-primary sm:text-xs">{kartu.nama.latin}</span> : null}
      </>
    );
  }
  const [awal, inti] = pecahArti(kartu.nama.arti);
  return (
    <>
      {awal ? <span className="text-[10px] font-medium text-foreground/60 sm:text-xs">{awal}</span> : null}
      <span className={cn("font-play font-semibold leading-tight text-heading", kecil ? "text-[11px] sm:text-sm" : "text-sm sm:text-base")}>
        {inti}
      </span>
    </>
  );
}

export function CocokAsmaulHusna({ game }: { game: PermainanInfo }) {
  const [level, setLevel] = useState<PermainanLane>("mudah");
  const [kartu, setKartu] = useState<Kartu[] | null>(null);
  const [terbuka, setTerbuka] = useState<number[]>([]);
  const [cocok, setCocok] = useState<number[]>([]);
  const [percobaan, setPercobaan] = useState(0);
  const [salah, setSalah] = useState(false);
  const [menutup, setMenutup] = useState<number[]>([]);
  const [note, setNote] = useState("");
  const [selesai, setSelesai] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const mulai = useCallback((next: PermainanLane) => {
    clearTimeout(timer.current);
    setLevel(next);
    setKartu(buatPapan(next));
    setTerbuka([]);
    setCocok([]);
    setPercobaan(0);
    setSalah(false);
    setMenutup([]);
    setNote("");
    setSelesai(false);
  }, []);

  const pairs = LEVEL[level].pairs;

  useEffect(() => {
    if (!kartu || cocok.length !== pairs) return;
    timer.current = setTimeout(() => setSelesai(true), 900);
    return () => clearTimeout(timer.current);
  }, [cocok.length, kartu, pairs]);

  const buka = (index: number) => {
    if (!kartu || salah || terbuka.includes(index) || cocok.includes(kartu[index].nama.nomor)) return;
    const next = [...terbuka, index];
    if (next.length < 2) {
      setTerbuka(next);
      setNote("");
      return;
    }

    setPercobaan((n) => n + 1);
    const [a, b] = next.map((i) => kartu[i]);
    if (a.nama.nomor === b.nama.nomor) {
      setCocok((list) => [...list, a.nama.nomor]);
      setTerbuka([]);
      setNote(`Cocok! ${a.nama.latin}: ${a.nama.arti}.`);
      return;
    }

    setTerbuka(next);
    setSalah(true);
    setNote("Belum cocok. Ingat letaknya, lalu coba lagi.");
    timer.current = setTimeout(() => {
      setTerbuka([]);
      setMenutup(next);
      timer.current = setTimeout(() => {
        setMenutup([]);
        setSalah(false);
      }, BALIK_MS);
    }, TUTUP_MS);
  };

  if (!kartu) {
    return (
      <GameShell game={game}>
        <div className="mx-auto flex max-w-md flex-col">
          <p className="text-center font-play text-2xl font-semibold text-heading">Pilih tingkat dulu</p>
          <p className="mt-2 text-center text-sm text-foreground/70">
            Buka dua kartu. Pasangkan nama Allah dalam bahasa Arab dengan artinya.
          </p>
          <div role="radiogroup" aria-label="Tingkat kesulitan" className="mt-6 grid gap-3">
            {LANE_ORDER.map((item) => {
              const config = LEVEL[item];
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
                    <span className="block font-play text-xl font-semibold">{LANE_STYLES[item].label}</span>
                    <span className={cn("block text-sm", selected ? "opacity-80" : "text-foreground/65")}>
                      {config.pairs} pasangan
                    </span>
                  </span>
                  <span className="font-play text-2xl font-bold tabular-nums">{config.ukuran}</span>
                </button>
              );
            })}
          </div>
          <Button size="lg" className="mt-6 min-h-14 font-play text-lg" onClick={() => mulai(level)}>
            Mulai mencocokkan
          </Button>
        </div>
      </GameShell>
    );
  }

  if (selesai) {
    const daftar = kartu.filter((item) => item.jenis === "arab").map((item) => item.nama);
    return (
      <GameShell game={game}>
        <GameResult
          correct={Math.min(percobaan, Math.round(pairs * 1.6))}
          total={percobaan}
          scoreLabel={`Semua ${pairs} pasangan ketemu dalam ${percobaan} kali percobaan.`}
          onReplay={() => mulai(level)}
        >
          <ul className="grid gap-2 text-left sm:grid-cols-2">
            {daftar.map((nama) => (
              <li key={nama.nomor} className="flex items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-2">
                <span className="min-w-0">
                  <span className="block font-play text-sm font-semibold text-heading">{nama.latin}</span>
                  <span className="block text-xs text-foreground/65">{nama.arti}</span>
                </span>
                <span lang="ar" dir="rtl" className="font-arabic text-2xl leading-[1.6] text-heading">
                  {nama.arab}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setKartu(null)}
              className="min-h-11 cursor-pointer rounded-full px-3 font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Ganti tingkat
            </button>
            <Link
              href="/belajar/asmaul-husna"
              className="inline-flex min-h-11 items-center rounded-full px-3 font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Pelajari 99 nama
            </Link>
          </div>
        </GameResult>
      </GameShell>
    );
  }

  const kecil = level === "sulit";

  return (
    <GameShell game={game}>
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-3 text-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm border border-foreground/20 bg-surface" aria-hidden="true" />
              Arab
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm border border-secondary/60 bg-secondary/25" aria-hidden="true" />
              Arti
            </span>
          </span>
          <span className="whitespace-nowrap tabular-nums text-foreground/70">
            <span className="font-play text-base font-semibold text-heading">
              {cocok.length}/{pairs}
            </span>{" "}
            pasangan · {percobaan} percobaan
          </span>
        </div>

        <ul className={cn("mt-4 grid gap-2 sm:gap-3", LEVEL[level].cols)} aria-label="Kartu Asmaul Husna">
          {kartu.map((item, index) => {
            const sudahCocok = cocok.includes(item.nama.nomor);
            const hadap = sudahCocok || terbuka.includes(index);
            const keliru = salah && terbuka.includes(index);
            const label = hadap
              ? `${item.jenis === "arab" ? item.nama.latin : item.nama.arti}${sudahCocok ? ", sudah cocok" : ""}`
              : `Kartu tertutup ${index + 1}`;
            return (
              <li key={item.id} className="[perspective:800px]">
                <button
                  type="button"
                  onClick={() => buka(index)}
                  aria-label={label}
                  aria-disabled={sudahCocok || undefined}
                  className={cn(
                    "group relative block aspect-[3/4] w-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/70",
                    !hadap && "cursor-pointer",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
                    style={{ transform: hadap ? "rotateY(180deg)" : undefined }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary shadow-sm transition-colors [backface-visibility:hidden] group-hover:bg-primary-dark">
                      <span className="absolute inset-1.5 rounded-xl border border-white/20" aria-hidden="true" />
                      <KhatamStar filled className="h-1/3 w-1/3 max-w-12 opacity-90" />
                    </span>
                    <span
                      className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 px-1.5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]",
                        item.jenis === "arab" ? "bg-surface" : "bg-secondary/15 dark:bg-secondary/10",
                        keliru
                          ? "border-error"
                          : sudahCocok
                            ? "border-primary"
                            : item.jenis === "arab"
                              ? "border-foreground/15"
                              : "border-secondary/50",
                      )}
                    >
                      {hadap || menutup.includes(index) ? (
                        <MukaKartu kartu={item} cocok={sudahCocok} kecil={kecil} />
                      ) : null}
                      {sudahCocok ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="absolute left-1.5 top-1.5 h-4 w-4 text-primary"
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
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 min-h-6 text-center text-sm text-foreground/75" aria-live="polite">
          {note || "Buka dua kartu: satu nama Arab dan satu arti yang sesuai."}
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => mulai(level)}
            className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Acak ulang
          </button>
          <button
            type="button"
            onClick={() => setKartu(null)}
            className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-medium text-foreground/70 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ganti tingkat
          </button>
        </div>
      </div>
    </GameShell>
  );
}
