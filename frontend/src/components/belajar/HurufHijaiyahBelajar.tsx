"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { TulisHurufDialog } from "@/components/belajar/TulisHurufDialog";
import { HARAKAT_INFO, HURUF_BELAJAR, hurufBerharakat } from "@/data/belajar/hijaiyah";
import { cn } from "@/lib/utils";
import type { Harakat, HurufBelajar } from "@/types/belajar";

type Mode = "nama" | Harakat;

const HARAKAT: Harakat[] = ["fathah", "kasrah", "dhammah"];

const MODE_OPTIONS: { value: Mode; label: string; tanda?: string }[] = [
  { value: "nama", label: "Nama huruf" },
  ...HARAKAT.map((h) => ({ value: h, label: HARAKAT_INFO[h].label, tanda: hurufBerharakat("ب", h) })),
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function glyphFor(huruf: HurufBelajar, mode: Mode) {
  return mode === "nama" ? huruf.glyph : hurufBerharakat(huruf.glyph, mode);
}

function bacaanFor(huruf: HurufBelajar, mode: Mode) {
  return mode === "nama" ? huruf.name : huruf.bacaan[mode];
}

function ModeSwitch({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div role="radiogroup" aria-label="Tampilkan huruf sebagai" className="flex flex-wrap gap-2">
      {MODE_OPTIONS.map((option) => {
        const active = option.value === mode;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary text-white"
                : "border-foreground/10 bg-surface text-heading hover:border-primary hover:bg-primary/10",
              focusRing,
            )}
          >
            {option.tanda ? (
              <span lang="ar" className="font-arabic text-xl leading-[1.6]" aria-hidden="true">
                {option.tanda}
              </span>
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function DetailHuruf({
  huruf,
  mode,
  onTulis,
}: {
  huruf: HurufBelajar;
  mode: Mode;
  onTulis: () => void;
}) {
  return (
    <div className="rounded-[1.75rem] border border-foreground/10 bg-surface p-5 sm:p-6" aria-live="polite">
      <div className="belajar-ruled flex h-40 items-center justify-center rounded-2xl bg-background [--rule-gap:2.5rem]">
        <span lang="ar" className="font-arabic text-8xl leading-none text-heading">
          {glyphFor(huruf, mode)}
        </span>
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Nama huruf</p>
      <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-heading">{huruf.name}</h2>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {HARAKAT.map((h) => (
          <div
            key={h}
            className={cn(
              "rounded-xl border px-2 py-3 text-center",
              mode === h ? "border-primary bg-primary/10" : "border-foreground/10",
            )}
          >
            <dt className="text-[11px] font-medium text-foreground/60">{HARAKAT_INFO[h].label}</dt>
            <dd lang="ar" className="font-arabic text-3xl leading-[1.9] text-heading">
              {hurufBerharakat(huruf.glyph, h)}
            </dd>
            <dd className="text-sm font-semibold text-heading">{huruf.bacaan[h]}</dd>
          </div>
        ))}
      </dl>

      {huruf.tip ? (
        <p className="mt-5 border-l-2 border-secondary pl-3 text-sm text-foreground/75">{huruf.tip}</p>
      ) : null}

      <button
        type="button"
        onClick={onTulis}
        className={cn(
          "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90",
          focusRing,
        )}
      >
        Latihan menulis
      </button>
    </div>
  );
}

export function HurufHijaiyahBelajar() {
  const [mode, setMode] = useState<Mode>("fathah");
  const [selected, setSelected] = useState(HURUF_BELAJAR[1]);
  const [menulis, setMenulis] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const pilih = (huruf: HurufBelajar) => {
    setSelected(huruf);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      detailRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const info = mode === "nama" ? null : HARAKAT_INFO[mode];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <ModeSwitch mode={mode} onChange={setMode} />
        <p className="text-sm text-foreground/70">
          {info
            ? `${info.label}: ${info.letak.toLowerCase()}, dibaca berakhiran "${info.bunyi}".`
            : "Huruf hijaiyah ditulis dan dibaca dari kanan ke kiri, dimulai dari alif."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div ref={detailRef} className="scroll-mt-24 lg:sticky lg:top-24 lg:order-2">
          <DetailHuruf huruf={selected} mode={mode} onTulis={() => setMenulis(true)} />
        </div>

        <div className="lg:order-1">
          <ol dir="rtl" className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {HURUF_BELAJAR.map((huruf) => {
              const active = huruf.glyph === selected.glyph;
              return (
                <li key={huruf.glyph}>
                  <button
                    type="button"
                    onClick={() => pilih(huruf)}
                    aria-pressed={active}
                    aria-label={`${huruf.name}, dibaca ${huruf.bacaan.fathah}, ${huruf.bacaan.kasrah}, ${huruf.bacaan.dhammah}`}
                    className={cn(
                      "relative flex aspect-[4/5] w-full flex-col items-center justify-center rounded-2xl border pb-1 transition-colors",
                      active
                        ? "border-primary bg-primary/10"
                        : "border-foreground/10 bg-surface hover:border-primary/50",
                      focusRing,
                    )}
                  >
                    {huruf.tip ? (
                      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    ) : null}
                    <span lang="ar" className="font-arabic text-3xl leading-[1.5] text-heading sm:text-4xl">
                      {glyphFor(huruf, mode)}
                    </span>
                    <span dir="ltr" className="mt-3 text-xs font-medium text-foreground/65 sm:text-sm">
                      {bacaanFor(huruf, mode)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 flex items-center gap-2 text-xs text-foreground/60">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
            Huruf bertitik emas punya cara keluar bunyi yang perlu diperhatikan. Ketuk untuk melihat petunjuknya.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-[60ch] text-sm text-foreground/75">
          Tempat keluar bunyi (makhraj) paling tepat dipelajari langsung bersama guru ngaji. Halaman ini membantu
          mengenal bentuk huruf dan cara bacanya.
        </p>
        <Link
          href="/permainan/kenal-hijaiyah"
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90",
            focusRing,
          )}
        >
          Latihan di Kenal Hijaiyah →
        </Link>
      </div>
      <TulisHurufDialog open={menulis} huruf={selected} onClose={() => setMenulis(false)} />
    </div>
  );
}
