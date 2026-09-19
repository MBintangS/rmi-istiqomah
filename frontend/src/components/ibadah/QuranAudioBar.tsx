"use client";

import { Button, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { QuranQari } from "@/types/api";

interface QuranAudioBarProps {
  qari: QuranQari[];
  qariId: string;
  onQariChange: (id: string) => void;
  showLatin: boolean;
  showTranslation: boolean;
  onToggleLatin: () => void;
  onToggleTranslation: () => void;
  surahPlaying: boolean;
  onToggleSurah: () => void;
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5h3v14H7V5Zm7 0h3v14h-3V5Z" />
    </svg>
  );
}

function PreferenceToggle({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-caption font-medium text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full motion-safe:transition-colors motion-safe:duration-200",
          checked ? "bg-secondary" : "bg-foreground/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm",
            "motion-safe:transition-transform motion-safe:duration-200",
            checked && "translate-x-5",
          )}
        />
      </span>
    </button>
  );
}

export function QuranAudioBar({
  qari,
  qariId,
  onQariChange,
  showLatin,
  showTranslation,
  onToggleLatin,
  onToggleTranslation,
  surahPlaying,
  onToggleSurah,
}: QuranAudioBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[1.25rem] border border-secondary/40 bg-surface px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="quran-qari">
          Qari
        </label>
        <Select
          id="quran-qari"
          value={qariId}
          onChange={(event) => onQariChange(event.target.value)}
          className="h-11 max-w-[16rem] border-secondary/30"
        >
          {qari.length === 0 ? (
            <option value={qariId}>Memuat qari…</option>
          ) : (
            qari.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          )}
        </Select>
        <Button type="button" size="sm" className="min-h-11" variant={surahPlaying ? "secondary" : "primary"} onClick={onToggleSurah}>
          {surahPlaying ? <PauseIcon /> : <PlayIcon />}
          <span className="ml-2">{surahPlaying ? "Jeda surat" : "Putar surat"}</span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        <PreferenceToggle label="Latin" checked={showLatin} onToggle={onToggleLatin} />
        <PreferenceToggle label="Terjemah" checked={showTranslation} onToggle={onToggleTranslation} />
      </div>
    </div>
  );
}

export function QuranAyahPlayButton({
  playing,
  onClick,
}: {
  playing: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={playing ? "Jeda ayat" : "Putar ayat"}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        playing ? "border-secondary bg-secondary text-ink" : "border-secondary/30 hover:bg-primary/10",
      )}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
