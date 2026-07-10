"use client";

import { notFound } from "next/navigation";
import { AdminArtikelForm } from "@/components/admin/AdminArtikelForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useArticle } from "@/hooks/useArticle";
import { getApiErrorMessage } from "@/lib/api";

interface AdminArtikelEditViewProps {
  slug: string;
}

export function AdminArtikelEditView({ slug }: AdminArtikelEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useArticle(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-64 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat artikel..." />
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
        title="Gagal memuat artikel"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  return <AdminArtikelForm mode="edit" initial={data} />;
}
