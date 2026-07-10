"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  EmptyState,
  Input,
  Label,
  Modal,
  Select,
  SkeletonList,
} from "@/components/ui";
import { useKategori } from "@/hooks/useKategori";
import { getApiErrorMessage } from "@/lib/api";
import { kategoriFormSchema, type KategoriFormValues } from "@/lib/cms-support-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createKategori, deleteKategori, updateKategori } from "@/services/kategori.service";
import type { KategoriItem } from "@/types/api";

const TYPE_LABELS: Record<KategoriItem["type"], string> = {
  artikel: "Artikel",
  kegiatan: "Kegiatan",
  galeri: "Galeri",
};

export function AdminKategoriList() {
  const queryClient = useQueryClient();
  const [typeFilter, setTypeFilter] = useState<"" | KategoriItem["type"]>("");
  const { data, isLoading, isError, error, refetch } = useKategori(
    typeFilter || undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<KategoriItem | null>(null);
  const [editTarget, setEditTarget] = useState<KategoriItem | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<KategoriFormValues>({
    resolver: zodResolver(kategoriFormSchema),
    defaultValues: {
      name: "",
      type: "artikel",
      slug: "",
    },
  });

  const items = useMemo(() => data ?? [], [data]);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.kategori.all });
  };

  const createMutation = useMutation({
    mutationFn: (values: KategoriFormValues) =>
      createKategori({
        name: values.name,
        type: values.type,
        slug: values.slug || undefined,
      }),
    onSuccess: (response) => {
      toast.success(response.message ?? "Kategori berhasil dibuat");
      setCreateOpen(false);
      reset({ name: "", type: typeFilter || "artikel", slug: "" });
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: (values: KategoriFormValues) => {
      if (!editTarget) throw new Error("Tidak ada kategori");
      return updateKategori(editTarget.id, {
        name: values.name,
        type: values.type,
        slug: values.slug || undefined,
      });
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Kategori berhasil diperbarui");
      setEditTarget(null);
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteKategori(id),
    onSuccess: () => {
      toast.success("Kategori berhasil dihapus");
      setDeleteTarget(null);
      invalidate();
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  const openCreate = () => {
    reset({ name: "", type: typeFilter || "artikel", slug: "" });
    setCreateOpen(true);
  };

  const openEdit = (item: KategoriItem) => {
    reset({ name: item.name, type: item.type, slug: item.slug });
    setEditTarget(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as "" | KategoriItem["type"])}
          className="sm:w-48"
          aria-label="Filter tipe kategori"
        >
          <option value="">Semua tipe</option>
          <option value="artikel">Artikel</option>
          <option value="kegiatan">Kegiatan</option>
          <option value="galeri">Galeri</option>
        </Select>
        <Button onClick={openCreate}>Tambah Kategori</Button>
      </div>

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat kategori"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada kategori"
          description="Buat kategori untuk artikel, kegiatan, atau galeri."
          actionLabel="Tambah Kategori"
          onAction={openCreate}
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-surface shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-background/60 text-caption uppercase tracking-wide text-foreground/60">
              <tr>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-heading">{item.name}</td>
                  <td className="px-4 py-3 text-caption text-foreground/60">{item.slug}</td>
                  <td className="px-4 py-3">
                    <Badge variant="category">{TYPE_LABELS[item.type]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="text-caption font-medium text-primary hover:underline"
                        onClick={() => openEdit(item)}
                      >
                        Edit
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

      <Modal
        open={createOpen || Boolean(editTarget)}
        onClose={() => {
          setCreateOpen(false);
          setEditTarget(null);
        }}
        title={editTarget ? "Edit Kategori" : "Tambah Kategori"}
      >
        <form
          onSubmit={handleSubmit((values) => {
            if (editTarget) {
              updateMutation.mutate(values);
            } else {
              createMutation.mutate(values);
            }
          })}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Nama
            </Label>
            <Input id="name" error={Boolean(errors.name)} {...register("name")} />
            {errors.name && <p className="text-caption text-red-600">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" required>
              Tipe
            </Label>
            <Select id="type" {...register("type")}>
              <option value="artikel">Artikel</option>
              <option value="kegiatan">Kegiatan</option>
              <option value="galeri">Galeri</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (opsional)</Label>
            <Input id="slug" placeholder="auto dari nama" {...register("slug")} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCreateOpen(false);
                setEditTarget(null);
              }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || createMutation.isPending || updateMutation.isPending
              }
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Menyimpan..."
                : editTarget
                  ? "Simpan"
                  : "Buat"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Hapus kategori?">
        <p className="text-body text-foreground/80">
          Kategori <strong>{deleteTarget?.name}</strong> akan dihapus. Tidak bisa dihapus jika masih
          dipakai konten.
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
