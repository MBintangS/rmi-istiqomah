"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { useKategori } from "@/hooks/useKategori";
import { getApiErrorMessage } from "@/lib/api";
import { artikelFormSchema, type ArtikelFormValues } from "@/lib/artikel-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createArtikel, updateArtikel } from "@/services/artikel.service";
import { uploadImage } from "@/services/upload.service";
import type { ArtikelDetail } from "@/types/api";

interface AdminArtikelFormProps {
  mode: "create" | "edit";
  initial?: ArtikelDetail;
}

export function AdminArtikelForm({ mode, initial }: AdminArtikelFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading: categoriesLoading } = useKategori("artikel");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArtikelFormValues>({
    resolver: zodResolver(artikelFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      content: initial?.content ?? "",
      category: initial?.category?.id ?? "",
      thumbnail: initial?.thumbnail ?? "",
      status: initial?.status ?? "draft",
      excerpt: initial?.excerpt ?? "",
      metaTitle: initial?.metaTitle ?? "",
      metaDescription: initial?.metaDescription ?? "",
    },
  });

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (initial?.category?.id) {
      setValue("category", initial.category.id);
    }
  }, [initial?.category?.id, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (values: ArtikelFormValues) => {
      const payload = {
        title: values.title,
        content: values.content,
        category: values.category,
        thumbnail: values.thumbnail || "",
        status: values.status,
        excerpt: values.excerpt || undefined,
        metaTitle: values.metaTitle || undefined,
        metaDescription: values.metaDescription || undefined,
      };

      if (mode === "edit" && initial) {
        return updateArtikel(initial.id, payload);
      }

      return createArtikel(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Artikel berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.artikel.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/artikel");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadImage(file, "artikel");
      setValue("thumbnail", result.url, { shouldValidate: true });
      toast.success("Thumbnail berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload gambar"));
    } finally {
      setUploading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Memuat form..." />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title" required>
              Judul
            </Label>
            <Input id="title" error={Boolean(errors.title)} {...register("title")} />
            {errors.title && <p className="text-caption text-red-600">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label required>Konten</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.content)}
                />
              )}
            />
            {errors.content && (
              <p className="text-caption text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" rows={3} {...register("excerpt")} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="category" required>
              Kategori
            </Label>
            <Select id="category" error={Boolean(errors.category)} {...register("category")}>
              <option value="">Pilih kategori</option>
              {(categories ?? []).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="text-caption text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" required>
              Status
            </Label>
            <Select id="status" {...register("status")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailFile">Thumbnail</Label>
            <Input
              id="thumbnailFile"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              onChange={(event) => void handleUpload(event.target.files?.[0])}
            />
            {uploading && <p className="text-caption text-foreground/60">Mengupload...</p>}
            {thumbnail ? (
              <div className="relative mt-2 aspect-video overflow-hidden rounded-rmi border border-foreground/10">
                <Image src={thumbnail} alt="Thumbnail artikel" fill className="object-cover" />
              </div>
            ) : null}
            <input type="hidden" {...register("thumbnail")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" {...register("metaTitle")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea id="metaDescription" rows={3} {...register("metaDescription")} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending ? "Menyimpan..." : mode === "create" ? "Buat Artikel" : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/artikel">
          Batal
        </Button>
      </div>
    </form>
  );
}
