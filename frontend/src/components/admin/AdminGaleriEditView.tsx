"use client";

import { notFound } from "next/navigation";
import { AdminGaleriForm } from "@/components/admin/AdminGaleriForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useGaleriById } from "@/hooks/useGaleriById";
import { getApiErrorMessage } from "@/lib/api";

interface AdminGaleriEditViewProps {
  id: string;
}

export function AdminGaleriEditView({ id }: AdminGaleriEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useGaleriById(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-64 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat album..." />
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
        title="Gagal memuat album"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminGaleriForm mode="edit" initial={data} />;
}
