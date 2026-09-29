"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminDeleteButton, AdminEditLink, AdminRowActions } from "@/components/admin/AdminRowActions";
import { AdminDataTable, AdminPanel, AdminTableHead, AdminToolbar } from "@/components/admin/AdminChrome";
import { Badge, Button, EmptyState, Modal, SkeletonList } from "@/components/ui";
import { useAdminPendaftaran } from "@/hooks/usePendaftaran";
import { getApiErrorMessage } from "@/lib/api";
import { pendaftaranStatusLabel } from "@/lib/pendaftaran-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { deletePendaftaran } from "@/services/pendaftaran.service";
import type { PendaftaranItem, PendaftaranStatus } from "@/types/api";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

function statusVariant(status: PendaftaranStatus): "default" | "success" | "warning" | "category" {
  if (status === "open") return "success";
  if (status === "closed") return "warning";
  if (status === "scheduled") return "category";
  return "default";
}

export function AdminPendaftaranList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useAdminPendaftaran();
  const [deleteTarget, setDeleteTarget] = useState<PendaftaranItem | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePendaftaran(id),
    onSuccess: () => {
      toast.success("Pendaftaran berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.pendaftaran.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data ?? [];

  return (
    <div className="space-y-5">
      <AdminToolbar className="sm:justify-end">
        <Button href="/admin/pendaftaran/baru">Buka pendaftaran</Button>
      </AdminToolbar>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={4} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
            title="Gagal memuat pendaftaran"
            description={getApiErrorMessage(error)}
            actionLabel="Coba lagi"
            onAction={() => refetch()}
          />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState
            title="Belum ada pendaftaran"
            description="Buka periode pendaftaran untuk program yang sudah aktif."
            actionLabel="Buka pendaftaran"
            onAction={() => {
              window.location.href = "/admin/pendaftaran/baru";
            }}
          />
        </AdminPanel>
      ) : (
        <AdminDataTable>
          <AdminTableHead>
            <tr>
              <th className="px-3.5 py-2.5 font-medium">Judul</th>
              <th className="px-3.5 py-2.5 font-medium">Program</th>
              <th className="px-3.5 py-2.5 font-medium">Periode</th>
              <th className="px-3.5 py-2.5 font-medium">Status</th>
              <th className="px-3.5 py-2.5 font-medium">Peserta</th>
              <th className="px-3.5 py-2.5 font-medium">Aksi</th>
            </tr>
          </AdminTableHead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                <td className="px-3.5 py-2.5">
                  <p className="font-medium text-heading">{item.title}</p>
                  <p className="line-clamp-1 text-caption text-foreground/50">{item.slug}</p>
                </td>
                <td className="px-3.5 py-2.5 text-caption text-foreground/70">{item.program?.name ?? "—"}</td>
                <td className="px-3.5 py-2.5 text-caption text-foreground/70">
                  {formatWhen(item.opensAt)} – {formatWhen(item.closesAt)}
                </td>
                <td className="px-3.5 py-2.5">
                  <Badge variant={statusVariant(item.status)}>{pendaftaranStatusLabel[item.status]}</Badge>
                </td>
                <td className="px-3.5 py-2.5 tabular-nums">{item.pesertaCount ?? 0}</td>
                <td className="px-3.5 py-2.5">
                  <AdminRowActions>
                    <Button href={`/admin/pendaftaran/${item.id}/peserta`} variant="outline" size="sm">
                      Peserta
                    </Button>
                    <AdminEditLink href={`/admin/pendaftaran/${item.id}/edit`} />
                    <AdminDeleteButton onClick={() => setDeleteTarget(item)} />
                  </AdminRowActions>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminDataTable>
      )}

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus pendaftaran?">
        <p className="text-body text-foreground/80">
          Pendaftaran <strong>{deleteTarget?.title}</strong> dan seluruh pesertanya akan dihapus.
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
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
}
