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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.key}
          href={card.href}
          className="rounded-rmi border border-foreground/10 bg-surface p-5 shadow-soft transition-colors hover:border-primary/30"
        >
          <p className="text-caption font-medium text-foreground/60">{card.label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">{data[card.key]}</p>
        </Link>
      ))}
    </div>
  );
}
