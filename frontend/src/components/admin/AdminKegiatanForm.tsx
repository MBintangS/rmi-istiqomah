"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { useKategori } from "@/hooks/useKategori";
import { getApiErrorMessage } from "@/lib/api";
import { dateInputToIso, toDateInputValue } from "@/lib/date-input";
import { kegiatanFormSchema, type KegiatanFormValues } from "@/lib/kegiatan-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createKegiatan, updateKegiatan } from "@/services/kegiatan.service";
import { uploadImage } from "@/services/upload.service";
import type { KegiatanDetail } from "@/types/api";

interface AdminKegiatanFormProps {
  mode: "create" | "edit";
  initial?: KegiatanDetail;
}

export function AdminKegiatanForm({ mode, initial }: AdminKegiatanFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading: categoriesLoading } = useKategori("kegiatan");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<KegiatanFormValues>({
    resolver: zodResolver(kegiatanFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      dateStart: toDateInputValue(initial?.dateStart) || "",
      dateEnd: toDateInputValue(initial?.dateEnd) || "",
      time: initial?.time ?? "",
      location: initial?.location ?? "",
      locationMap: initial?.locationMap ?? "",
      category: initial?.category?.id ?? "",
      thumbnail: initial?.thumbnail ?? "",
      status: initial?.status ?? "upcoming",
      isPublished: initial?.isPublished ?? false,
    },
  });

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (initial?.category?.id) {
      setValue("category", initial.category.id);
    }
  }, [initial?.category?.id, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (values: KegiatanFormValues) => {
      const payload = {
        title: values.title,
        description: values.description,
        dateStart: dateInputToIso(values.dateStart),
        dateEnd: values.dateEnd ? dateInputToIso(values.dateEnd) : null,
        time: values.time || undefined,
        location: values.location || undefined,
        locationMap: values.locationMap || undefined,
        category: values.category,
        thumbnail: values.thumbnail || "",
        status: values.status,
        isPublished: values.isPublished,
      };

      if (mode === "edit" && initial) {
        return updateKegiatan(initial.id, payload);
      }

      return createKegiatan(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Kegiatan berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.kegiatan.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/kegiatan");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "kegiatan");
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
      className="space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 sm:p-5"
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
            <Label htmlFor="description" required>
              Deskripsi
            </Label>
            <Textarea
              id="description"
              rows={6}
              error={Boolean(errors.description)}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-caption text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateStart" required>
                Tanggal Mulai
              </Label>
              <Input
                id="dateStart"
                type="date"
                error={Boolean(errors.dateStart)}
                {...register("dateStart")}
              />
              {errors.dateStart && (
                <p className="text-caption text-red-600">{errors.dateStart.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateEnd">Tanggal Selesai</Label>
              <Input
                id="dateEnd"
                type="date"
                error={Boolean(errors.dateEnd)}
                {...register("dateEnd")}
              />
              {errors.dateEnd && (
                <p className="text-caption text-red-600">{errors.dateEnd.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="time">Waktu</Label>
              <Input id="time" placeholder="08:00 WIB" {...register("time")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" {...register("location")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationMap">Google Maps Embed URL</Label>
            <Input id="locationMap" {...register("locationMap")} />
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
              Status Kegiatan
            </Label>
            <Select id="status" {...register("status")}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isPublished" required>
              Publikasi
            </Label>
            <Select
              id="isPublished"
              {...register("isPublished", {
                setValueAs: (value) => value === "true" || value === true,
              })}
            >
              <option value="false">Draft</option>
              <option value="true">Published</option>
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
                <Image
                  src={thumbnail}
                  alt="Thumbnail kegiatan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            ) : null}
            <input type="hidden" {...register("thumbnail")} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Kegiatan"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/kegiatan">
          Batal
        </Button>
      </div>
    </form>
  );
}
