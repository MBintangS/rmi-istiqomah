"use client";

import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { QuranRevelationPlace } from "@/types/api";

export const quranFrameOuter =
  "rounded-[1.5rem] border border-secondary/40 bg-surface p-[6px]";
export const quranFrameInner = "rounded-[1.15rem] border border-secondary/20 bg-background";

export function SuratMedallion({
  number,
  size = "md",
}: {
  number: number;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center text-secondary",
        size === "sm" ? "h-11 w-11" : "h-14 w-14",
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0" aria-hidden="true">
        <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <g transform="translate(24 24)" fill="none" stroke="currentColor" strokeWidth="1.25">
          <rect x="-11" y="-11" width="22" height="22" />
          <rect x="-11" y="-11" width="22" height="22" transform="rotate(45)" />
        </g>
        <circle cx="24" cy="24" r="10.5" className="fill-background" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span
        className={cn(
          "relative font-semibold tabular-nums leading-none text-heading",
          size === "sm" ? "text-[10px]" : "text-[11px]",
        )}
      >
        {number}
      </span>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function QuranSearchField({
  id,
  value,
  onChange,
  label,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-secondary-alt">
          <SearchIcon />
        </span>
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-11 border-secondary/30 bg-background pl-10 pr-12"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Hapus pencarian"
            className="absolute inset-y-0 right-1 inline-flex w-11 items-center justify-center rounded-full text-foreground/55 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function QuranPlaceFilter({
  value,
  onChange,
  counts,
}: {
  value: QuranRevelationPlace | "";
  onChange: (value: QuranRevelationPlace | "") => void;
  counts: { all: number; mekah: number; madinah: number };
}) {
  const options = [
    { id: "", label: "Semua", hint: `${counts.all} surat` },
    { id: "Mekah" as const, label: "Makkiyah", hint: "Turun di Mekah" },
    { id: "Madinah" as const, label: "Madaniyah", hint: "Turun di Madinah" },
  ];

  return (
    <div role="group" aria-label="Tempat turun" className="grid grid-cols-3 gap-2">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-h-11 rounded-[1rem] border px-2 py-2.5 text-center motion-safe:transition-colors motion-safe:duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              selected
                ? "border-secondary bg-secondary text-ink"
                : "border-secondary/30 bg-background text-foreground/75 hover:border-secondary/60 hover:bg-primary/5",
            )}
          >
            <span className="block text-caption font-semibold">{option.label}</span>
            <span className={cn("mt-0.5 block text-[10px] leading-snug", selected ? "text-ink/70" : "text-foreground/50")}>
              {option.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
