"use client";

import { AdminDokumenForm } from "@/components/admin/AdminDokumenForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useDokumen } from "@/hooks/useDokumen";
import { getApiErrorMessage } from "@/lib/api";

interface AdminDokumenEditViewProps {
  id: string;
}

export function AdminDokumenEditView({ id }: AdminDokumenEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useDokumen({ limit: 100 });
  const dokumen = data?.items.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-24 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat dokumen..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat dokumen"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!dokumen) {
    return (
      <EmptyState
        title="Dokumen tidak ditemukan"
        description="Dokumen mungkin sudah dihapus."
        actionLabel="Kembali"
        onAction={() => {
          window.location.href = "/admin/dokumen";
        }}
      />
    );
  }

  return <AdminDokumenForm mode="edit" initial={dokumen} />;
}
