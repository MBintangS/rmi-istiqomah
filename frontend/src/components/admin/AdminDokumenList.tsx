"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Badge, Button, EmptyState, Modal, SkeletonList } from "@/components/ui";
import { useDokumen } from "@/hooks/useDokumen";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deleteDokumen, updateDokumen } from "@/services/dokumen.service";
import type { DokumenListItem } from "@/types/api";

function formatFileSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminDokumenList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useDokumen({ limit: 100 });
  const [deleteTarget, setDeleteTarget] = useState<DokumenListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDokumen(id),
    onSuccess: () => {
      toast.success("Dokumen berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.dokumen.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      updateDokumen(id, { isPublished }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isPublished ? "Dokumen dipublikasikan" : "Dokumen dijadikan draft");
      void queryClient.invalidateQueries({ queryKey: queryKeys.dokumen.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button href="/admin/dokumen/baru">Tambah Dokumen</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat dokumen"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada dokumen"
          description="Dokumen terpublikasi bisa diunduh di halaman publik."
          actionLabel="Tambah Dokumen"
          onAction={() => {
            window.location.href = "/admin/dokumen/baru";
          }}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-surface shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-background/60 text-caption uppercase tracking-wide text-foreground/60">
              <tr>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Ukuran</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-heading">{item.name}</p>
                    <p className="text-caption text-foreground/50">{item.category || "Tanpa kategori"}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{item.fileType || "—"}</td>
                  <td className="px-4 py-3 text-foreground/70">{formatFileSize(item.fileSize)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={item.isPublished ? "success" : "warning"}>
                      {item.isPublished ? "published" : "draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/dokumen/${item.id}/edit`}
                        className="text-caption font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-caption font-medium text-foreground/70 hover:text-primary"
                      >
                        Unduh
                      </a>
                      <button
                        type="button"
                        className="text-caption font-medium text-foreground/70 hover:text-primary"
                        disabled={toggleMutation.isPending}
                        onClick={() =>
                          toggleMutation.mutate({
                            id: item.id,
                            isPublished: !item.isPublished,
                          })
                        }
                      >
                        {item.isPublished ? "Draft" : "Publish"}
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

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus dokumen?">
        <p className="text-body text-foreground/80">
          Dokumen <strong>{deleteTarget?.name}</strong> akan dihapus permanen.
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
