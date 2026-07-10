"use client";

import Link from "next/link";
import { EmptyState, SkeletonList } from "@/components/ui";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { getApiErrorMessage } from "@/lib/api";

const cards = [
  { key: "publishedArtikel", label: "Artikel Terbit", href: "/admin/artikel" },
  { key: "draftArtikel", label: "Artikel Draft", href: "/admin/artikel" },
  { key: "publishedKegiatan", label: "Kegiatan", href: "/admin/kegiatan" },
  { key: "totalGaleri", label: "Galeri", href: "/admin/galeri" },
  { key: "totalPengurus", label: "Pengurus", href: "/admin/pengurus" },
  { key: "totalProgram", label: "Program", href: "/admin/program" },
  { key: "totalDokumen", label: "Dokumen", href: "/admin/dokumen" },
  { key: "totalMessages", label: "Pesan Kontak", href: "/admin/dashboard" },
] as const;

export function DashboardStatsGrid() {
  const { data, isLoading, isError, error, refetch } = useDashboardStats();

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Gagal memuat statistik"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.key}
          href={card.href}
          className="rounded-rmi border border-foreground/10 bg-background px-4 py-3.5 transition-colors hover:border-primary/35"
        >
          <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">
            {card.label}
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            <span className="text-primary">{data[card.key]}</span>
          </p>
        </Link>
      ))}
    </div>
  );
}
