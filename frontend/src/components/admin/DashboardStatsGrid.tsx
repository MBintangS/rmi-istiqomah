"use client";

import Link from "next/link";
import { EmptyState, Skeleton } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { getApiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

const allCards = [
  { key: "publishedArtikel", label: "Artikel terbit", href: "/admin/artikel", hint: "Kelola artikel" },
  { key: "draftArtikel", label: "Artikel draft", href: "/admin/artikel", hint: "Siap diterbitkan" },
  { key: "publishedKegiatan", label: "Kegiatan", href: "/admin/kegiatan", hint: "Lihat kegiatan" },
  { key: "totalGaleri", label: "Galeri", href: "/admin/galeri", hint: "Album foto" },
  { key: "totalPengurus", label: "Pengurus", href: "/admin/pengurus", hint: "Struktur organisasi", superAdminOnly: true },
  { key: "totalProgram", label: "Program", href: "/admin/program", hint: "Program unggulan", superAdminOnly: true },
  { key: "totalDokumen", label: "Dokumen", href: "/admin/dokumen", hint: "File publik" },
  { key: "totalMessages", label: "Pesan kontak", href: "#pesan-kontak", hint: "Inbox pengunjung" },
] as const;

export function DashboardStatsGrid() {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } = useDashboardStats();
  const isSuperAdmin = user?.role === "superadmin";
  const cards = allCards.filter(
    (card) => !("superAdminOnly" in card && card.superAdminOnly) || isSuperAdmin,
  );

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[5.5rem] w-full rounded-rmi" />
        ))}
      </div>
    );
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
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-heading">Ringkasan konten</h3>
        <p className="text-[11px] text-foreground/45">Klik kartu untuk membuka modul</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className={cn(
              "group relative overflow-hidden rounded-rmi border border-foreground/10 bg-background",
              "px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
          >
            <span
              className="absolute inset-y-0 left-0 w-[3px] bg-primary/25 transition-colors group-hover:bg-primary"
              aria-hidden="true"
            />
            <p className="pl-1 text-[11px] font-medium uppercase tracking-wide text-foreground/50">
              {card.label}
            </p>
            <p className="mt-1.5 pl-1 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {data[card.key]}
            </p>
            <p className="mt-1 pl-1 text-[11px] text-foreground/40 transition-colors group-hover:text-primary">
              {card.hint}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
