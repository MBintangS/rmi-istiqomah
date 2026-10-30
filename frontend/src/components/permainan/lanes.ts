import type { PermainanLane } from "@/types/permainan";

interface LaneStyle {
  label: string;
  note: string;
  /** 1–3, drawn as diamond pips. */
  rank: number;
  /** Solid door / badge. */
  solid: string;
  /** Tinted play surface. */
  tint: string;
  /** Text on tinted surfaces. */
  text: string;
  ring: string;
}

export const LANE_ORDER: PermainanLane[] = ["mudah", "sedang", "sulit"];

export const LANE_STYLES: Record<PermainanLane, LaneStyle> = {
  mudah: {
    label: "Mudah",
    note: "Tebak dan susun",
    rank: 1,
    solid: "bg-secondary text-ink",
    tint: "bg-secondary/15",
    text: "text-secondary-alt",
    ring: "ring-secondary",
  },
  sedang: {
    label: "Sedang",
    note: "Susun dan kuis",
    rank: 2,
    solid: "bg-primary text-white",
    tint: "bg-primary/10",
    text: "text-primary",
    ring: "ring-primary",
  },
  sulit: {
    label: "Sulit",
    note: "Kuis dan kasus",
    rank: 3,
    solid: "bg-ink text-on-ink",
    tint: "bg-ink/[0.06] dark:bg-on-ink/[0.06]",
    text: "text-heading",
    ring: "ring-heading",
  },
};
