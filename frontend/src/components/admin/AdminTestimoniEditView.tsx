"use client";

import { AdminTestimoniForm } from "@/components/admin/AdminTestimoniForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useTestimoni } from "@/hooks/useTestimoni";
import { getApiErrorMessage } from "@/lib/api";

interface AdminTestimoniEditViewProps {
  id: string;
}

export function AdminTestimoniEditView({ id }: AdminTestimoniEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useTestimoni();
  const testimoni = data?.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-32 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat testimoni..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat testimoni"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!testimoni) {
    return (
      <EmptyState
        title="Testimoni tidak ditemukan"
        description="Testimoni mungkin sudah dihapus."
        actionLabel="Kembali"
        onAction={() => {
          window.location.href = "/admin/testimoni";
        }}
      />
    );
  }

  return <AdminTestimoniForm mode="edit" initial={testimoni} />;
}
