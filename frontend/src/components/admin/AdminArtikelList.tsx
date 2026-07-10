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
  Select,
  SkeletonList,
} from "@/components/ui";
import { useArticles } from "@/hooks/useArticles";
import { getApiErrorMessage } from "@/lib/api";
import { formatEventDate } from "@/lib/format-date";
import { queryKeys } from "@/lib/query-keys";
import { deleteArtikel, updateArtikel } from "@/services/artikel.service";
import type { ArtikelListItem } from "@/types/api";

export function AdminArtikelList() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<"" | "draft" | "published">("");
  const [deleteTarget, setDeleteTarget] = useState<ArtikelListItem | null>(null);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      status: status || undefined,
      sort: "-updatedAt",
    }),
    [page, search, status],
  );

  const { data, isLoading, isError, error, refetch } = useArticles(params);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteArtikel(id),
    onSuccess: () => {
      toast.success("Artikel berhasil dihapus");
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.artikel.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: "draft" | "published" }) =>
      updateArtikel(id, { status: nextStatus }),
    onSuccess: (_res, variables) => {
      toast.success(
        variables.nextStatus === "published" ? "Artikel dipublikasikan" : "Artikel dijadikan draft",
      );
      void queryClient.invalidateQueries({ queryKey: queryKeys.artikel.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
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
              placeholder="Cari judul artikel..."
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
              setStatus(event.target.value as "" | "draft" | "published");
            }}
            className="sm:w-44"
            aria-label="Filter status"
          >
            <option value="">Semua status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Select>
        </div>
        <Button href="/admin/artikel/baru">Tambah Artikel</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={5} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat artikel"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada artikel"
          description="Buat artikel pertama untuk ditampilkan di website."
          actionLabel="Tambah Artikel"
          onAction={() => {
            window.location.href = "/admin/artikel/baru";
          }}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-surface shadow-soft">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-foreground/10 bg-background/60 text-caption uppercase tracking-wide text-foreground/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Judul</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Diperbarui</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-heading">{item.title}</p>
                      <p className="text-caption text-foreground/50">/{item.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      {item.category?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={item.status === "published" ? "success" : "warning"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      {formatEventDate(item.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/artikel/${item.slug}/edit`}
                          className="text-caption font-medium text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="text-caption font-medium text-foreground/70 hover:text-primary"
                          disabled={statusMutation.isPending}
                          onClick={() =>
                            statusMutation.mutate({
                              id: item.id,
                              nextStatus: item.status === "published" ? "draft" : "published",
                            })
                          }
                        >
                          {item.status === "published" ? "Unpublish" : "Publish"}
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

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Hapus artikel?"
      >
        <p className="text-body text-foreground/80">
          Artikel <strong>{deleteTarget?.title}</strong> akan dihapus permanen.
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
