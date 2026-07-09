import type { ArtikelListParams } from "@/types/api";

export const queryKeys = {
  health: ["health"] as const,
  artikel: {
    all: ["artikel"] as const,
    lists: () => [...queryKeys.artikel.all, "list"] as const,
    list: (params?: ArtikelListParams) => [...queryKeys.artikel.lists(), params ?? {}] as const,
    details: () => [...queryKeys.artikel.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.artikel.details(), slug] as const,
  },
  program: {
    all: ["program"] as const,
    lists: () => [...queryKeys.program.all, "list"] as const,
    list: () => [...queryKeys.program.lists()] as const,
    details: () => [...queryKeys.program.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.program.details(), slug] as const,
  },
} as const;
