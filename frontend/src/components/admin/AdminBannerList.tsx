"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  EmptyState,
  Modal,
  SkeletonList,
} from "@/components/ui";
import {
  AdminRowActions,
  AdminEditLink,
  AdminDeleteButton,
  AdminToggleActiveButton,
} from "@/components/admin/AdminRowActions";
import { AdminDataTable, AdminPanel, AdminTableHead, AdminToolbar } from "@/components/admin/AdminChrome";
import { useBanners } from "@/hooks/useBanners";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deleteBanner, updateBanner } from "@/services/banner.service";
import type { BannerListItem } from "@/types/api";

export function AdminBannerList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useBanners();
  const [deleteTarget, setDeleteTarget] = useState<BannerListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBanner(id),
    onSuccess: () => {
      toast.success("Banner berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.banner.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateBanner(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Banner diaktifkan" : "Banner dinonaktifkan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.banner.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-5">
      <AdminToolbar className="sm:justify-end">
        <Button href="/admin/banner/baru">Tambah Banner</Button>
      </AdminToolbar>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={4} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
          title="Gagal memuat banner"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState
          title="Belum ada banner"
          description="Banner aktif akan tampil di hero beranda."
          actionLabel="Tambah Banner"
          onAction={() => {
            window.location.href = "/admin/banner/baru";
          }}
        />
        </AdminPanel>
      ) : (
        <AdminDataTable>
            <AdminTableHead>
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Preview</th>
                <th className="px-3.5 py-2.5 font-medium">Judul</th>
                <th className="px-3.5 py-2.5 font-medium">Order</th>
                <th className="px-3.5 py-2.5 font-medium">Status</th>
                <th className="px-3.5 py-2.5 font-medium">Aksi</th>
              </tr>
            </AdminTableHead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                  <td className="px-3.5 py-2.5">
                    <div className="relative h-14 w-24 overflow-hidden rounded-rmi bg-primary/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="font-medium text-heading">{item.title}</p>
                    <p className="text-caption text-foreground/50">{item.link || "Tanpa link"}</p>
                  </td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.order}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge variant={item.isActive ? "success" : "warning"}>
                      {item.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <AdminRowActions>
                      <AdminEditLink href={`/admin/banner/${item.id}/edit`} />
                      <AdminToggleActiveButton
                        active={item.isActive}
                        disabled={toggleMutation.isPending}
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            isActive: !item.isActive,
                          })
                        }
                      />
                      <AdminDeleteButton onClick={() => setDeleteTarget(item)} />
                    </AdminRowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </AdminDataTable>
      )}

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus banner?">
        <p className="text-body text-foreground/80">
          Banner <strong>{deleteTarget?.title}</strong> akan dihapus permanen.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Batal
          </Button>
          <Button
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
            }}
          >
            {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
