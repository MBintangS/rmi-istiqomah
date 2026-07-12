"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  EmptyState,
  Input,
  Modal,
  Pagination,
  Select,
  SkeletonList,
} from "@/components/ui";
import {
  AdminRowActions,
  AdminEditLink,
  AdminDeleteButton,
  AdminPublishButton,
} from "@/components/admin/AdminRowActions";
import { AdminDataTable, AdminPanel, AdminTableHead, AdminToolbar } from "@/components/admin/AdminChrome";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { formatEventDate } from "@/lib/format-date";
import { queryKeys } from "@/lib/query-keys";
import { deleteKegiatan, updateKegiatan } from "@/services/kegiatan.service";
import type { KegiatanListItem } from "@/types/api";

export function AdminKegiatanList() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<"" | "upcoming" | "ongoing" | "completed">("");
  const [published, setPublished] = useState<"" | "true" | "false">("");
  const [deleteTarget, setDeleteTarget] = useState<KegiatanListItem | null>(null);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      status: status || undefined,
      sort: "-dateStart",
    }),
    [page, search, status],
  );

  const { data, isLoading, isError, error, refetch } = useKegiatan(params);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteKegiatan(id),
    onSuccess: () => {
      toast.success("Kegiatan berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.kegiatan.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      updateKegiatan(id, { isPublished }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isPublished ? "Kegiatan dipublikasikan" : "Kegiatan disembunyikan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.kegiatan.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = (data?.items ?? []).filter((item) => {
    if (published === "true") return item.isPublished;
    if (published === "false") return !item.isPublished;
    return true;
  });
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <div className="space-y-5">
      <AdminToolbar>
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <form
            className="flex flex-1 gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setSearch(searchInput.trim());
            }}
          >
            <Input
              type="search"
              placeholder="Cari kegiatan..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline">
              Cari
            </Button>
          </form>
          <Select
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value as typeof status);
            }}
            className="lg:w-44"
            aria-label="Filter status"
          >
            <option value="">Semua status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </Select>
          <Select
            value={published}
            onChange={(event) => setPublished(event.target.value as typeof published)}
            className="lg:w-44"
            aria-label="Filter publikasi"
          >
            <option value="">Semua publikasi</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </Select>
        </div>
        <Button href="/admin/kegiatan/baru">Tambah Kegiatan</Button>
      </AdminToolbar>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={5} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
          title="Gagal memuat kegiatan"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState
          title="Belum ada kegiatan"
          description="Buat kegiatan agar tampil di beranda setelah dipublikasikan."
          actionLabel="Tambah Kegiatan"
          onAction={() => {
            window.location.href = "/admin/kegiatan/baru";
          }}
        />
        </AdminPanel>
      ) : (
        <>
          <AdminDataTable>
            <AdminTableHead>
                <tr>
                  <th className="px-3.5 py-2.5 font-medium">Judul</th>
                  <th className="px-3.5 py-2.5 font-medium">Tanggal</th>
                  <th className="px-3.5 py-2.5 font-medium">Status</th>
                  <th className="px-3.5 py-2.5 font-medium">Publikasi</th>
                  <th className="px-3.5 py-2.5 font-medium">Aksi</th>
                </tr>
              </AdminTableHead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0">
                    <td className="px-3.5 py-2.5">
                      <p className="font-medium text-heading">{item.title}</p>
                      <p className="text-caption text-foreground/50">
                        {item.category?.name ?? "-"} · {item.location || "Tanpa lokasi"}
                      </p>
                    </td>
                    <td className="px-3.5 py-2.5 text-foreground/70">
                      {formatEventDate(item.dateStart)}
                    </td>
                    <td className="px-3.5 py-2.5">
                      <Badge variant="category">{item.status}</Badge>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <Badge variant={item.isPublished ? "success" : "warning"}>
                        {item.isPublished ? "published" : "draft"}
                      </Badge>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <AdminRowActions>
                        <AdminEditLink href={`/admin/kegiatan/${item.slug}/edit`} />
                        <AdminPublishButton
                          published={item.isPublished}
                          disabled={publishMutation.isPending}
                          onClick={() =>
                            publishMutation.mutate({
                              id: item.id,
                              isPublished: !item.isPublished,
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
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Hapus kegiatan?"
      >
        <p className="text-body text-foreground/80">
          Kegiatan <strong>{deleteTarget?.title}</strong> akan dihapus permanen.
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
