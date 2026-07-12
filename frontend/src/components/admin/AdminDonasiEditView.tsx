"use client";

import { AdminDonasiForm } from "@/components/admin/AdminDonasiForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useDonasi } from "@/hooks/useDonasi";
import { getApiErrorMessage } from "@/lib/api";

interface AdminDonasiEditViewProps {
  id: string;
}

export function AdminDonasiEditView({ id }: AdminDonasiEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useDonasi();
  const donasi = data?.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-32 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat rekening donasi..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat rekening donasi"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!donasi) {
    return (
      <EmptyState
        title="Rekening tidak ditemukan"
        description="Rekening mungkin sudah dihapus."
        actionLabel="Kembali"
        onAction={() => {
          window.location.href = "/admin/donasi";
        }}
      />
    );
  }

  return <AdminDonasiForm mode="edit" initial={donasi} />;
}
