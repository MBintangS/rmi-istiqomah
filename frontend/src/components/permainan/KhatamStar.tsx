import { cn } from "@/lib/utils";

const OUTER = 11;
const INNER = 8.4;

/** Eight-pointed khatam star: the RMI reward unit across all games. */
const POINTS = Array.from({ length: 16 }, (_, i) => {
  const radius = i % 2 === 0 ? OUTER : INNER;
  const angle = (Math.PI / 8) * i - Math.PI / 2;
  return `${(12 + radius * Math.cos(angle)).toFixed(2)},${(12 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

interface KhatamStarProps {
  filled: boolean;
  className?: string;
}

export function KhatamStar({ filled, className }: KhatamStarProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} aria-hidden="true">
      <polygon
        points={POINTS}
        strokeLinejoin="round"
        strokeWidth={1.4}
        className={cn(
          filled ? "fill-secondary stroke-secondary-alt" : "fill-transparent stroke-foreground/25",
        )}
      />
      {filled ? <circle cx="12" cy="12" r="2.4" className="fill-background/70" /> : null}
    </svg>
  );
}
