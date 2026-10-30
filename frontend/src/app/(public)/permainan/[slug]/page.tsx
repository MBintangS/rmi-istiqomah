import { notFound } from "next/navigation";
import { GamePlayer } from "@/components/permainan/GamePlayer";
import { PERMAINAN_CATALOG, getPermainan } from "@/data/permainan/catalog";
import { buildPageMetadata } from "@/lib/seo";

interface PermainanDetailProps {
  params: { slug: string };
}

export const dynamicParams = false;

/** Daftar slug mengikuti katalog permainan. */
export function generateStaticParams() {
  return PERMAINAN_CATALOG.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: PermainanDetailProps) {
  const game = getPermainan(params.slug);
  if (!game) return {};
  return buildPageMetadata({
    title: `${game.title} · Permainan`,
    description: `${game.summary} Permainan Islami dari Remaja Masjid Istiqomah.`,
    path: `/permainan/${game.slug}`,
  });
}

export default function PermainanDetailPage({ params }: PermainanDetailProps) {
  const game = getPermainan(params.slug);
  if (!game) notFound();
  return <GamePlayer slug={game.slug} />;
}
