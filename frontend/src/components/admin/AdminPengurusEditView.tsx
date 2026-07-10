"use client";

import { AdminPengurusForm } from "@/components/admin/AdminPengurusForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { usePengurus } from "@/hooks/usePengurus";
import { getApiErrorMessage } from "@/lib/api";

interface AdminPengurusEditViewProps {
  id: string;
}

export function AdminPengurusEditView({ id }: AdminPengurusEditViewProps) {
  const { data, isLoading, isError, error, refetch } = usePengurus();
  const pengurus = data?.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat pengurus..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat pengurus"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!pengurus) {
    return (
      <EmptyState
        title="Pengurus tidak ditemukan"
        description="Pengurus mungkin sudah dihapus."
        actionLabel="Kembali"
        onAction={() => {
          window.location.href = "/admin/pengurus";
        }}
      />
    );
  }

  return <AdminPengurusForm mode="edit" initial={pengurus} />;
}
