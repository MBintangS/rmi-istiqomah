"use client";

import Link from "next/link";
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
  SkeletonList,
} from "@/components/ui";
import { useAgendaList } from "@/hooks/useAgendaList";
import { getApiErrorMessage } from "@/lib/api";
import { formatEventDate } from "@/lib/format-date";
import { queryKeys } from "@/lib/query-keys";
import { deleteAgenda, updateAgenda } from "@/services/agenda.service";
import type { AgendaListItem } from "@/types/api";

export function AdminAgendaList() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AgendaListItem | null>(null);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      sort: "date",
    }),
    [page, search],
  );

  const { data, isLoading, isError, error, refetch } = useAgendaList(params);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAgenda(id),
    onSuccess: () => {
      toast.success("Agenda berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.agenda.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      updateAgenda(id, { isPublished }),
    onSuccess: (_res, variables) => {
      toast.success(variables.isPublished ? "Agenda dipublikasikan" : "Agenda disembunyikan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.agenda.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data?.items ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
            placeholder="Cari agenda..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline">
            Cari
          </Button>
        </form>
        <Button href="/admin/agenda/baru">Tambah Agenda</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={5} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat agenda"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada agenda"
          description="Agenda opsional untuk jadwal ringkas; beranda publik memakai kegiatan."
          actionLabel="Tambah Agenda"
          onAction={() => {
            window.location.href = "/admin/agenda/baru";
          }}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-surface shadow-soft">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-foreground/10 bg-background/60 text-caption uppercase tracking-wide text-foreground/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Judul</th>
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                  <th className="px-4 py-3 font-medium">Kegiatan</th>
                  <th className="px-4 py-3 font-medium">Publikasi</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-heading">{item.title}</p>
                      <p className="text-caption text-foreground/50">
                        {item.time || "—"} · {item.location || "Tanpa lokasi"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">{formatEventDate(item.date)}</td>
                    <td className="px-4 py-3 text-foreground/70">{item.event?.title ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={item.isPublished ? "success" : "warning"}>
                        {item.isPublished ? "published" : "draft"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/agenda/${item.id}/edit`}
                          className="text-caption font-medium text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="text-caption font-medium text-foreground/70 hover:text-primary"
                          disabled={publishMutation.isPending}
                          onClick={() =>
                            publishMutation.mutate({
                              id: item.id,
                              isPublished: !item.isPublished,
                            })
                          }
                        >
                          {item.isPublished ? "Unpublish" : "Publish"}
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
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus agenda?">
        <p className="text-body text-foreground/80">
          Agenda <strong>{deleteTarget?.title}</strong> akan dihapus permanen.
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
