"use client";

import { notFound } from "next/navigation";
import { AdminKegiatanForm } from "@/components/admin/AdminKegiatanForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useKegiatanBySlug } from "@/hooks/useKegiatanBySlug";
import { getApiErrorMessage } from "@/lib/api";

interface AdminKegiatanEditViewProps {
  slug: string;
}

export function AdminKegiatanEditView({ slug }: AdminKegiatanEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useKegiatanBySlug(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-64 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat kegiatan..." />
        </div>
      </div>
    );
  }

  if (isError) {
    const message = getApiErrorMessage(error);
    if (message.toLowerCase().includes("tidak ditemukan")) {
      notFound();
    }
    return (
      <EmptyState
        title="Gagal memuat kegiatan"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminKegiatanForm mode="edit" initial={data} />;
}
