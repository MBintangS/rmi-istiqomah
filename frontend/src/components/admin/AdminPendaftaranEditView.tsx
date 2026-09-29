"use client";

import { notFound } from "next/navigation";
import { AdminPendaftaranForm } from "@/components/admin/AdminPendaftaranForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useAdminPendaftaranById } from "@/hooks/usePendaftaran";
import { getApiErrorMessage } from "@/lib/api";

export function AdminPendaftaranEditView({ id }: { id: string }) {
  const { data, isLoading, isError, error, refetch } = useAdminPendaftaranById(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-64 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat pendaftaran..." />
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
        title="Gagal memuat pendaftaran"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminPendaftaranForm mode="edit" initial={data} />;
}
