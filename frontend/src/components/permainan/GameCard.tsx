import Link from "next/link";
import { GameGlyph } from "@/components/permainan/GameGlyph";
import { LANE_STYLES } from "@/components/permainan/lanes";
import { cn } from "@/lib/utils";
import type { PermainanInfo } from "@/types/permainan";

const GLYPH_COLOR: Record<PermainanInfo["slug"], string> = {
  "kenal-hijaiyah": "text-ink dark:text-white",
  "urutan-wudu": "text-primary",
  "kuis-lima-menit": "text-primary",
  "kasus-akhlak": "text-heading",
  "cari-kata": "text-heading",
  "cocok-asmaul-husna": "text-primary",
};

interface GameCardProps {
  game: PermainanInfo;
  compact?: boolean;
}

export function GameCard({ game, compact = false }: GameCardProps) {
  const lane = LANE_STYLES[game.lanes[0]];

  if (compact) {
    return (
      <Link
        href={`/permainan/${game.slug}`}
        className="group flex min-h-20 items-center gap-4 rounded-3xl border border-foreground/10 bg-surface p-3 pr-5 transition-shadow hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
      >
        <span className={cn("flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl", lane.tint)}>
          <GameGlyph slug={game.slug} className={cn("scale-[0.45]", GLYPH_COLOR[game.slug])} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-play text-lg font-semibold text-heading">{game.title}</span>
          <span className="block text-sm text-foreground/65">{game.summary}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/permainan/${game.slug}`}
      className="group flex flex-col rounded-[2rem] border border-foreground/10 bg-surface p-3 transition-shadow duration-300 hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
    >
      <span className={cn("play-lattice relative flex h-44 items-end justify-center overflow-hidden rounded-[1.5rem] sm:h-48", lane.tint)}>
        <span className="relative flex h-36 w-32 items-center justify-center rounded-t-[999px] bg-background/85 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 sm:h-40 sm:w-36">
          <GameGlyph slug={game.slug} className={GLYPH_COLOR[game.slug]} />
        </span>
      </span>

      <span className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <span className="block font-play text-2xl font-semibold leading-tight text-heading">{game.title}</span>
        <span className="mt-1.5 text-base text-foreground/75">{game.summary}</span>
        <span className="mt-auto flex items-center pt-4 text-sm">
          <span className="inline-flex items-center font-play text-base font-semibold text-primary">
            Main
            <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
