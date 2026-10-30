"use client";

import { CariKata } from "@/components/permainan/games/CariKata";
import { CocokAsmaulHusna } from "@/components/permainan/games/CocokAsmaulHusna";
import { KasusAkhlak } from "@/components/permainan/games/KasusAkhlak";
import { KenalHijaiyah } from "@/components/permainan/games/KenalHijaiyah";
import { KuisLimaMenit } from "@/components/permainan/games/KuisLimaMenit";
import { UrutanWudu } from "@/components/permainan/games/UrutanWudu";
import { getPermainan } from "@/data/permainan/catalog";
import type { PermainanSlug } from "@/types/permainan";

export function GamePlayer({ slug }: { slug: PermainanSlug }) {
  const game = getPermainan(slug);
  if (!game) return null;

  switch (game.slug) {
    case "kenal-hijaiyah":
      return <KenalHijaiyah game={game} />;
    case "urutan-wudu":
      return <UrutanWudu game={game} />;
    case "kuis-lima-menit":
      return <KuisLimaMenit game={game} />;
    case "kasus-akhlak":
      return <KasusAkhlak game={game} />;
    case "cari-kata":
      return <CariKata game={game} />;
    case "cocok-asmaul-husna":
      return <CocokAsmaulHusna game={game} />;
  }
}
