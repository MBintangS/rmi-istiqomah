"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Badge, Button, EmptyState, Modal, SkeletonList } from "@/components/ui";
import {
  AdminRowActions,
  AdminEditLink,
  AdminDeleteButton,
  AdminToggleActiveButton,
} from "@/components/admin/AdminRowActions";
import { useDonasi } from "@/hooks/useDonasi";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deleteDonasi, updateDonasi } from "@/services/donasi.service";
import type { DonasiListItem } from "@/types/api";

export function AdminDonasiList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useDonasi();
  const [deleteTarget, setDeleteTarget] = useState<DonasiListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDonasi(id),
    onSuccess: () => {
      toast.success("Rekening donasi berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.donasi.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateDonasi(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Rekening diaktifkan" : "Rekening dinonaktifkan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.donasi.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button href="/admin/donasi/baru">Tambah Rekening</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat rekening donasi"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada rekening donasi"
          description="Rekening aktif akan tampil di halaman donasi publik."
          actionLabel="Tambah Rekening"
          onAction={() => {
            window.location.href = "/admin/donasi/baru";
          }}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-background">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-surface/80 text-[11px] font-medium uppercase tracking-wide text-foreground/55">
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Bank</th>
                <th className="px-3.5 py-2.5 font-medium">No. Rekening</th>
                <th className="px-3.5 py-2.5 font-medium">Atas Nama</th>
                <th className="px-3.5 py-2.5 font-medium">Order</th>
                <th className="px-3.5 py-2.5 font-medium">Status</th>
                <th className="px-3.5 py-2.5 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0"
                >
                  <td className="px-3.5 py-2.5 font-medium text-heading">{item.bank}</td>
                  <td className="px-3.5 py-2.5 font-mono text-foreground/80">{item.accountNumber}</td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.accountName}</td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.order}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge variant={item.isActive ? "success" : "warning"}>
                      {item.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <AdminRowActions>
                      <AdminEditLink href={`/admin/donasi/${item.id}/edit`} />
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
          </table>
        </div>
      )}

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus rekening?">
        <p className="text-body text-foreground/80">
          Rekening <strong>{deleteTarget?.bank}</strong> (
          {deleteTarget?.accountNumber}) akan dihapus permanen.
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
