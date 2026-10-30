import Link from "next/link";
import { LANE_ORDER, LANE_STYLES } from "@/components/permainan/lanes";
import { cn } from "@/lib/utils";

const DOOR_HEIGHT = ["h-20", "h-24", "h-28"];

export function PermainanTeaserSection() {
  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/permainan"
          className="group flex flex-col gap-8 overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface px-6 pt-7 transition-shadow hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pt-9"
        >
          <div className="pb-0 sm:pb-9">
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-3xl">Main sambil mengenal Islam</h2>
            <p className="mt-2 max-w-[46ch] text-sm text-foreground/70 sm:text-base">
              Kenal hijaiyah, urutan wudu, cari kata, cocok asmaul husna, kuis, dan kasus akhlak.
            </p>
            <span className="mt-4 inline-flex items-center text-caption font-medium text-primary">
              Mulai bermain
              <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          </div>

          <div className="flex items-end gap-2.5 self-center sm:self-end" aria-hidden="true">
            {LANE_ORDER.map((lane, i) => (
              <span
                key={lane}
                className={cn(
                  "flex w-16 items-end justify-center rounded-t-[999px] pb-3 text-xs font-bold sm:text-sm transition-transform duration-300 group-hover:-translate-y-1 sm:w-20",
                  LANE_STYLES[lane].solid,
                  DOOR_HEIGHT[i],
                )}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {LANE_STYLES[lane].label}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
