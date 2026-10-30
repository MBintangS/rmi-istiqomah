import Link from "next/link";
import { type ReactNode } from "react";
import { LANE_STYLES } from "@/components/permainan/lanes";
import { cn } from "@/lib/utils";
import type { PermainanInfo } from "@/types/permainan";

interface GameShellProps {
  game: PermainanInfo;
  /** Zero-based current step. Omit to hide the progress track. */
  step?: number;
  total?: number;
  children: ReactNode;
}

export function GameShell({ game, step, total, children }: GameShellProps) {
  const lane = LANE_STYLES[game.lanes[0]];
  const showProgress = typeof step === "number" && typeof total === "number" && total > 0;

  return (
    <div className="bg-background pb-16 pt-5 sm:pb-24 sm:pt-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex items-center">
          <Link
            href="/permainan"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full pr-3 text-sm font-medium text-foreground/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span aria-hidden="true">←</span>
            Semua permainan
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h1 className="font-play text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
            {game.title}
          </h1>
          {showProgress ? (
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-foreground/70">
                {Math.min(step + 1, total)} dari {total}
              </span>
              <ol className="flex gap-1.5" aria-hidden="true">
                {Array.from({ length: total }, (_, i) => (
                  <li
                    key={i}
                    className={cn(
                      "h-2.5 w-2.5 rotate-45 rounded-[2px] transition-colors duration-300",
                      i < step ? "bg-secondary" : i === step ? "bg-primary" : "bg-foreground/15",
                    )}
                  />
                ))}
              </ol>
            </div>
          ) : null}
        </div>

        <div className={cn("mt-5 rounded-[2rem] p-4 sm:p-8", lane.tint)}>{children}</div>
      </div>
    </div>
  );
}
