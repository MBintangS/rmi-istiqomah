"use client";

import { notFound } from "next/navigation";
import { AdminAgendaForm } from "@/components/admin/AdminAgendaForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useAgendaById } from "@/hooks/useAgendaList";
import { getApiErrorMessage } from "@/lib/api";

interface AdminAgendaEditViewProps {
  id: string;
}

export function AdminAgendaEditView({ id }: AdminAgendaEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useAgendaById(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-40 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat agenda..." />
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
        title="Gagal memuat agenda"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminAgendaForm mode="edit" initial={data} />;
}
