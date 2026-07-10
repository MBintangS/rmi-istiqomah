"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Badge, Button, EmptyState, Modal, SkeletonList } from "@/components/ui";
import { useTestimoni } from "@/hooks/useTestimoni";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deleteTestimoni, updateTestimoni } from "@/services/testimoni.service";
import type { TestimoniListItem } from "@/types/api";

export function AdminTestimoniList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useTestimoni();
  const [deleteTarget, setDeleteTarget] = useState<TestimoniListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTestimoni(id),
    onSuccess: () => {
      toast.success("Testimoni berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.testimoni.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateTestimoni(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Testimoni diaktifkan" : "Testimoni dinonaktifkan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.testimoni.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button href="/admin/testimoni/baru">Tambah Testimoni</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat testimoni"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada testimoni"
          description="Testimoni aktif akan tampil di beranda."
          actionLabel="Tambah Testimoni"
          onAction={() => {
            window.location.href = "/admin/testimoni/baru";
          }}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-surface shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-background/60 text-caption uppercase tracking-wide text-foreground/60">
              <tr>
                <th className="px-4 py-3 font-medium">Foto</th>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Isi</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
                    <p className="font-medium text-heading">{item.name}</p>
                    <p className="text-caption text-foreground/50">{item.role || "—"}</p>
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <p className="line-clamp-2 text-foreground/70">{item.content}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{item.order}</td>
                  <td className="px-4 py-3">
                    <Badge variant={item.isActive ? "success" : "warning"}>
                      {item.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/testimoni/${item.id}/edit`}
                        className="text-caption font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="text-caption font-medium text-foreground/70 hover:text-primary"
                        disabled={toggleMutation.isPending}
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            isActive: !item.isActive,
                          })
                        }
                      >
                        {item.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                      <button
                        type="button"
                        className="text-caption font-medium text-red-600 hover:underline"
                        onClick={() => setDeleteTarget(item)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus testimoni?">
        <p className="text-body text-foreground/80">
          Testimoni dari <strong>{deleteTarget?.name}</strong> akan dihapus permanen.
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
