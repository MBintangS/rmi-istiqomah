import type {
  ArtikelListParams,
  DokumenListParams,
  GaleriListParams,
  KegiatanListParams,
} from "@/types/api";

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
  kegiatan: {
    all: ["kegiatan"] as const,
    lists: () => [...queryKeys.kegiatan.all, "list"] as const,
    list: (params?: KegiatanListParams) => [...queryKeys.kegiatan.lists(), params ?? {}] as const,
    details: () => [...queryKeys.kegiatan.all, "detail"] as const,
    detail: (slug: string) => [...queryKeys.kegiatan.details(), slug] as const,
  },
  galeri: {
    all: ["galeri"] as const,
    lists: () => [...queryKeys.galeri.all, "list"] as const,
    list: (params?: GaleriListParams) => [...queryKeys.galeri.lists(), params ?? {}] as const,
    details: () => [...queryKeys.galeri.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.galeri.details(), id] as const,
  },
  banner: {
    all: ["banner"] as const,
    list: () => [...queryKeys.banner.all, "list"] as const,
  },
  settings: {
    all: ["settings"] as const,
  },
  pengurus: {
    all: ["pengurus"] as const,
    list: () => [...queryKeys.pengurus.all, "list"] as const,
  },
  testimoni: {
    all: ["testimoni"] as const,
    list: () => [...queryKeys.testimoni.all, "list"] as const,
  },
  dokumen: {
    all: ["dokumen"] as const,
    lists: () => [...queryKeys.dokumen.all, "list"] as const,
    list: (params?: DokumenListParams) => [...queryKeys.dokumen.lists(), params ?? {}] as const,
  },
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  users: {
    all: ["users"] as const,
    list: () => [...queryKeys.users.all, "list"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
  },
  kategori: {
    all: ["kategori"] as const,
    list: (type?: string) => [...queryKeys.kategori.all, "list", type ?? "all"] as const,
  },
} as const;
