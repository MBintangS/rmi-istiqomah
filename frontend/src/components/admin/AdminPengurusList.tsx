"use client";

import Image from "next/image";
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
import { usePengurus } from "@/hooks/usePengurus";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deletePengurus, updatePengurus } from "@/services/pengurus.service";
import type { PengurusListItem } from "@/types/api";

export function AdminPengurusList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = usePengurus();
  const [deleteTarget, setDeleteTarget] = useState<PengurusListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePengurus(id),
    onSuccess: () => {
      toast.success("Pengurus berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.pengurus.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updatePengurus(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Pengurus diaktifkan" : "Pengurus dinonaktifkan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.pengurus.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button href="/admin/pengurus/baru">Tambah Pengurus</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat pengurus"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada pengurus"
          description="Pengurus aktif akan tampil di halaman Tentang Kami."
          actionLabel="Tambah Pengurus"
          onAction={() => {
            window.location.href = "/admin/pengurus/baru";
          }}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-background">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-surface/80 text-[11px] font-medium uppercase tracking-wide text-foreground/55">
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Foto</th>
                <th className="px-3.5 py-2.5 font-medium">Nama</th>
                <th className="px-3.5 py-2.5 font-medium">Jabatan</th>
                <th className="px-3.5 py-2.5 font-medium">Order</th>
                <th className="px-3.5 py-2.5 font-medium">Status</th>
                <th className="px-3.5 py-2.5 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                  <td className="px-3.5 py-2.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                      {item.photo ? (
                        <Image
                          src={item.photo}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="font-medium text-heading">{item.name}</p>
                    <p className="text-caption text-foreground/50">{item.period || "-"}</p>
                  </td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.position}</td>
                  <td className="px-3.5 py-2.5 text-foreground/70">{item.order}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge variant={item.isActive ? "success" : "warning"}>
                      {item.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <AdminRowActions>
                      <AdminEditLink href={`/admin/pengurus/${item.id}/edit`} />
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

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus pengurus?">
        <p className="text-body text-foreground/80">
          Pengurus <strong>{deleteTarget?.name}</strong> akan dihapus permanen.
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
