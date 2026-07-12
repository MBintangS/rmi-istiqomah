"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner } from "@/components/ui";
import { useKategori } from "@/hooks/useKategori";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { galeriFormSchema, type GaleriFormValues } from "@/lib/galeri-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createGaleri, updateGaleri } from "@/services/galeri.service";
import { uploadImage } from "@/services/upload.service";
import type { GaleriListItem } from "@/types/api";

interface AdminGaleriFormProps {
  mode: "create" | "edit";
  initial?: GaleriListItem;
}

type ImageDraft = GaleriFormValues["images"][number];

export function AdminGaleriForm({ mode, initial }: AdminGaleriFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: categories, isLoading: categoriesLoading } = useKategori("galeri");
  const { data: kegiatanData } = useKegiatan({ limit: 100, sort: "-dateStart" });
  const [images, setImages] = useState<ImageDraft[]>(
    initial?.images.map((item) => ({
      url: item.url,
      publicId: item.publicId ?? undefined,
      caption: item.caption ?? "",
    })) ?? [],
  );
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GaleriFormValues>({
    resolver: zodResolver(galeriFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      images:
        initial?.images.map((item) => ({
          url: item.url,
          publicId: item.publicId ?? undefined,
          caption: item.caption ?? "",
        })) ?? [],
      category: initial?.category?.id ?? "",
      eventId: initial?.event?.id ?? "",
      order: initial?.order ?? 0,
      isPublished: initial?.isPublished ?? false,
    },
  });

  useEffect(() => {
    setValue("images", images, { shouldValidate: true });
  }, [images, setValue]);

  useEffect(() => {
    if (initial?.category?.id) setValue("category", initial.category.id);
    if (initial?.event?.id) setValue("eventId", initial.event.id);
  }, [initial?.category?.id, initial?.event?.id, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (values: GaleriFormValues) => {
      const payload = {
        title: values.title,
        images: values.images.map((item) => ({
          url: item.url,
          publicId: item.publicId,
          caption: item.caption || undefined,
        })),
        category: values.category,
        eventId: values.eventId || undefined,
        order: values.order,
        isPublished: values.isPublished,
      };

      if (mode === "edit" && initial) {
        return updateGaleri(initial.id, payload);
      }

      return createGaleri(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Album berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.galeri.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/galeri");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded: ImageDraft[] = [];
      for (const file of Array.from(files)) {
        const result = await uploadImage(file, "galeri");
        uploaded.push({
          url: result.url,
          publicId: result.publicId,
          caption: "",
        });
      }
      setImages((prev) => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} gambar berhasil diupload`);
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
      className="space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title" required>
              Judul Album
            </Label>
            <Input id="title" error={Boolean(errors.title)} {...register("title")} />
            {errors.title && <p className="text-caption text-red-600">{errors.title.message}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="images" required>
              Foto (multi upload)
            </Label>
            <Input
              id="images"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              disabled={uploading}
              onChange={(event) => void handleUpload(event.target.files)}
            />
            {uploading && <p className="text-caption text-foreground/60">Mengupload...</p>}
            {errors.images && (
              <p className="text-caption text-red-600">
                {typeof errors.images.message === "string"
                  ? errors.images.message
                  : "Minimal satu gambar"}
              </p>
            )}

            {images.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {images.map((image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="overflow-hidden rounded-rmi border border-foreground/10 bg-surface"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={image.url}
                        alt={image.caption || `Foto ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
                    </div>
                    <div className="space-y-2 p-3">
                      <Input
                        placeholder="Caption (opsional)"
                        value={image.caption ?? ""}
                        onChange={(event) => {
                          const caption = event.target.value;
                          setImages((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, caption } : item)),
                          );
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                      >
                        Hapus foto
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            <Label htmlFor="eventId">Kegiatan terkait</Label>
            <Select id="eventId" {...register("eventId")}>
              <option value="">Tidak terhubung</option>
              {(kegiatanData?.items ?? []).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" required>
              Urutan
            </Label>
            <Input
              id="order"
              type="number"
              min={0}
              {...register("order", { valueAsNumber: true })}
            />
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
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Album"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/galeri">
          Batal
        </Button>
      </div>
    </form>
  );
}
