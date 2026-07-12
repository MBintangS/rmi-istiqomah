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
import { AdminDataTable, AdminPanel, AdminTableHead, AdminToolbar } from "@/components/admin/AdminChrome";
import { usePrograms } from "@/hooks/usePrograms";
import { getApiErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { deleteProgram, updateProgram } from "@/services/program.service";
import type { ProgramListItem } from "@/types/api";

export function AdminProgramList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = usePrograms();
  const [deleteTarget, setDeleteTarget] = useState<ProgramListItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => {
      toast.success("Program berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.program.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateProgram(id, { isActive }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isActive ? "Program diaktifkan" : "Program dinonaktifkan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.program.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-5">
      <AdminToolbar className="sm:justify-end">
        <Button href="/admin/program/baru">Tambah Program</Button>
      </AdminToolbar>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={4} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
          title="Gagal memuat program"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState
          title="Belum ada program"
          description="Program aktif akan tampil di halaman Program."
          actionLabel="Tambah Program"
          onAction={() => {
            window.location.href = "/admin/program/baru";
          }}
        />
        </AdminPanel>
      ) : (
        <AdminDataTable>
            <AdminTableHead>
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Gambar</th>
                <th className="px-3.5 py-2.5 font-medium">Nama</th>
                <th className="px-3.5 py-2.5 font-medium">Slug</th>
                <th className="px-3.5 py-2.5 font-medium">Status</th>
                <th className="px-3.5 py-2.5 font-medium">Aksi</th>
              </tr>
            </AdminTableHead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                  <td className="px-3.5 py-2.5">
                    <div className="relative h-14 w-20 overflow-hidden rounded-rmi bg-primary/10">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="font-medium text-heading">{item.name}</p>
                    <p className="line-clamp-1 text-caption text-foreground/50">
                      {item.description || "Tanpa deskripsi"}
                    </p>
                  </td>
                  <td className="px-3.5 py-2.5 text-caption text-foreground/60">{item.slug}</td>
                  <td className="px-3.5 py-2.5">
                    <Badge variant={item.isActive ? "success" : "warning"}>
                      {item.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <AdminRowActions>
                      <AdminEditLink href={`/admin/program/${item.slug}/edit`} />
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

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus program?">
        <p className="text-body text-foreground/80">
          Program <strong>{deleteTarget?.name}</strong> akan dihapus permanen.
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
