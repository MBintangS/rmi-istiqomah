import type { KegiatanStatus } from "@/types";

export const eventStatusLabels: Record<
  KegiatanStatus,
  { label: string; variant: "default" | "success" | "warning" | "category" }
> = {
  upcoming: { label: "Akan Datang", variant: "default" },
  ongoing: { label: "Berlangsung", variant: "warning" },
  completed: { label: "Selesai", variant: "category" },
};
