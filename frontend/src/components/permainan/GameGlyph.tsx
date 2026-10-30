import { cn } from "@/lib/utils";
import type { PermainanSlug } from "@/types/permainan";

/** The single characteristic object of each game, drawn inside the card's arch window. */
export function GameGlyph({ slug, className }: { slug: PermainanSlug; className?: string }) {
  switch (slug) {
    case "kenal-hijaiyah":
      return (
        <span lang="ar" dir="rtl" className={cn("font-arabic text-[5.5rem] leading-none", className)} aria-hidden="true">
          ب
        </span>
      );
    case "urutan-wudu":
      return (
        <svg viewBox="0 0 48 48" className={cn("h-24 w-24", className)} fill="none" aria-hidden="true">
          <path
            d="M24 6c0 8-12 15-12 25a12 12 0 0 0 24 0C36 21 24 14 24 6Z"
            className="fill-current opacity-90"
          />
          <path d="M19 31a5 5 0 0 0 5 5" stroke="white" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "kuis-lima-menit":
      return (
        <span className={cn("font-play text-[5.5rem] font-bold leading-none", className)} aria-hidden="true">
          5?
        </span>
      );
    case "cari-kata":
      return (
        <svg viewBox="0 0 48 48" className={cn("h-24 w-24", className)} aria-hidden="true">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={6 + col * 13}
                y={6 + row * 13}
                width="10"
                height="10"
                rx="2"
                className={row === 1 ? "fill-current" : "fill-current opacity-25"}
              />
            )),
          )}
        </svg>
      );
    case "cocok-asmaul-husna":
      return (
        <svg viewBox="0 0 48 48" className={cn("h-24 w-24", className)} fill="none" aria-hidden="true">
          <rect x="5" y="9" width="21" height="29" rx="4" transform="rotate(-10 15.5 23.5)" className="fill-current opacity-35" />
          <rect x="20" y="10" width="21" height="29" rx="4" transform="rotate(8 30.5 24.5)" className="fill-current" />
          <path
            d="m30.5 18.5 1.6 3.9 3.9 1.6-3.9 1.6-1.6 3.9-1.6-3.9-3.9-1.6 3.9-1.6Z"
            fill="white"
            fillOpacity="0.85"
            transform="rotate(8 30.5 24.5)"
          />
        </svg>
      );
    case "kasus-akhlak":
      return (
        <svg viewBox="0 0 48 48" className={cn("h-24 w-24", className)} fill="none" aria-hidden="true">
          <path d="M6 10h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H16l-7 6v-6H6a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" className="fill-current" />
          <path
            d="M42 20H37v8a6 6 0 0 1-6 6H22v1a3 3 0 0 0 3 3h10l6 5v-5h1a3 3 0 0 0 3-3V23a3 3 0 0 0-3-3Z"
            className="fill-current opacity-45"
          />
        </svg>
      );
  }
}
