"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GameCard } from "@/components/permainan/GameCard";
import { KhatamStar } from "@/components/permainan/KhatamStar";
import { LANE_ORDER, LANE_STYLES } from "@/components/permainan/lanes";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PERMAINAN_CATALOG } from "@/data/permainan/catalog";
import { usePermainanProgress } from "@/hooks/usePermainanProgress";
import { cn } from "@/lib/utils";
import type { PermainanLane } from "@/types/permainan";

const DOOR_HEIGHT: Record<PermainanLane, string> = {
  mudah: "h-44 sm:h-56",
  sedang: "h-52 sm:h-64",
  sulit: "h-60 sm:h-72",
};

function LaneDoor({
  lane,
  selected,
  dimmed,
  onSelect,
}: {
  lane: PermainanLane;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const style = LANE_STYLES[lane];
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      animate={reduce ? undefined : { y: selected ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-center justify-end rounded-b-2xl rounded-t-[999px] px-2 pb-5 text-center transition-[opacity,box-shadow] duration-300",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        style.solid,
        style.ring,
        DOOR_HEIGHT[lane],
        selected && "shadow-soft ring-4 ring-offset-4 ring-offset-background",
        dimmed && "opacity-55 hover:opacity-90",
      )}
    >
      <span
        className="pointer-events-none absolute inset-2 rounded-b-xl rounded-t-[999px] border border-current opacity-20"
        aria-hidden="true"
      />
      {selected ? (
        <span className="absolute top-[22%]" aria-hidden="true">
          <KhatamStar filled className="h-8 w-8 sm:h-10 sm:w-10" />
        </span>
      ) : null}
      <span className="mb-3 flex gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((pip) => (
          <span
            key={pip}
            className={cn(
              "h-2 w-2 rotate-45 rounded-[1px] border border-current",
              pip <= style.rank ? "bg-current" : "opacity-40",
            )}
          />
        ))}
      </span>
      <span className="font-play text-xl font-bold leading-none sm:text-3xl">{style.label}</span>
      <span className="mt-2 hidden text-xs opacity-75 sm:block sm:text-sm">{style.note}</span>
    </motion.button>
  );
}

export function PermainanHub() {
  const { lane, setLane } = usePermainanProgress();

  const forLane = lane ? PERMAINAN_CATALOG.filter((g) => g.lanes.includes(lane)) : PERMAINAN_CATALOG;
  const others = lane ? PERMAINAN_CATALOG.filter((g) => !g.lanes.includes(lane)) : [];

  return (
    <>
      <section className="relative overflow-hidden border-b border-foreground/10 bg-background">
        <div className="hero-diamond-field" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-0 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <Breadcrumb
            items={[{ label: "Beranda", href: "/" }, { label: "Edukasi", href: "/edukasi" }, { label: "Permainan" }]}
          />

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
            <div className="pb-2 lg:pb-14">
              <h1 className="mt-3 font-play text-[2.6rem] font-semibold leading-[1.05] tracking-normal sm:text-6xl">
                Pilih pintumu,
                <br />
                lalu mulai bermain.
              </h1>
            </div>

            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <div
                role="radiogroup"
                aria-label="Pilih level"
                className="grid grid-cols-3 items-end gap-3 sm:gap-5"
              >
                {LANE_ORDER.map((item) => (
                  <LaneDoor
                    key={item}
                    lane={item}
                    selected={lane === item}
                    dimmed={lane !== null && lane !== item}
                    onSelect={() => setLane(lane === item ? null : item)}
                  />
                ))}
              </div>
              <div className="h-3 rounded-t-md bg-foreground/10" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-play text-3xl font-semibold tracking-normal sm:text-4xl">
              {lane ? `Level ${LANE_STYLES[lane].label.toLowerCase()}` : "Semua permainan"}
            </h2>
            {lane ? (
              <button
                type="button"
                onClick={() => setLane(null)}
                className="min-h-11 cursor-pointer rounded-full px-3 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Tampilkan semua
              </button>
            ) : null}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {forLane.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>

          {others.length > 0 ? (
            <div className="mt-12">
              <h3 className="font-play text-xl font-semibold tracking-normal">Level lain</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {others.map((game) => (
                  <GameCard key={game.slug} game={game} compact />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
