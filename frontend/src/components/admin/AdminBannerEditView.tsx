"use client";

import { AdminBannerForm } from "@/components/admin/AdminBannerForm";
import { EmptyState, Skeleton, Spinner } from "@/components/ui";
import { useBanners } from "@/hooks/useBanners";
import { getApiErrorMessage } from "@/lib/api";

interface AdminBannerEditViewProps {
  id: string;
}

export function AdminBannerEditView({ id }: AdminBannerEditViewProps) {
  const { data, isLoading, isError, error, refetch } = useBanners();
  const banner = data?.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="aspect-[16/9] w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat banner..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat banner"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!banner) {
    return (
      <EmptyState
        title="Banner tidak ditemukan"
        description="Banner mungkin sudah dihapus."
        actionLabel="Kembali"
        onAction={() => {
          window.location.href = "/admin/banner";
        }}
      />
    );
  }

  return <AdminBannerForm mode="edit" initial={banner} />;
}
