"use client";

import { notFound } from "next/navigation";
import { AdminProgramForm } from "@/components/admin/AdminProgramForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useProgram } from "@/hooks/useProgram";
import { getApiErrorMessage } from "@/lib/api";

interface AdminProgramEditViewProps {
  slug: string;
}

export function AdminProgramEditView({ slug }: AdminProgramEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useProgram(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-64 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat program..." />
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
        title="Gagal memuat program"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminProgramForm mode="edit" initial={data} />;
}
