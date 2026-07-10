"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { bannerFormSchema, type BannerFormValues } from "@/lib/galeri-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createBanner, updateBanner } from "@/services/banner.service";
import { uploadImage } from "@/services/upload.service";
import type { BannerListItem } from "@/types/api";

interface AdminBannerFormProps {
  mode: "create" | "edit";
  initial?: BannerListItem;
}

export function AdminBannerForm({ mode, initial }: AdminBannerFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      image: initial?.image ?? "",
      link: initial?.link ?? "",
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
    },
  });

  const image = watch("image");

  const saveMutation = useMutation({
    mutationFn: async (values: BannerFormValues) => {
      const payload = {
        title: values.title,
        image: values.image,
        link: values.link || undefined,
        order: values.order,
        isActive: values.isActive,
      };

      if (mode === "edit" && initial) {
        return updateBanner(initial.id, payload);
      }

      return createBanner(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Banner berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.banner.all });
      router.push("/admin/banner");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "banner");
      setValue("image", result.url, { shouldValidate: true });
      toast.success("Gambar banner berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload gambar"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="mx-auto max-w-2xl space-y-5"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="title" required>
          Judul
        </Label>
        <Input id="title" error={Boolean(errors.title)} {...register("title")} />
        {errors.title && <p className="text-caption text-red-600">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageFile" required>
          Gambar Banner
        </Label>
        <Input
          id="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          onChange={(event) => void handleUpload(event.target.files?.[0])}
        />
        {uploading && (
          <div className="flex items-center gap-2">
            <Spinner size="sm" label="Mengupload..." />
          </div>
        )}
        {errors.image && <p className="text-caption text-red-600">{errors.image.message}</p>}
        {image ? (
          <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-rmi border border-foreground/10">
            <Image src={image} alt="Preview banner" fill className="object-cover" sizes="640px" />
          </div>
        ) : null}
        <input type="hidden" {...register("image")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="link">Link (opsional)</Label>
        <Input id="link" placeholder="/kegiatan" {...register("link")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
          <Label htmlFor="isActive" required>
            Status
          </Label>
          <Select
            id="isActive"
            {...register("isActive", {
              setValueAs: (value) => value === "true" || value === true,
            })}
          >
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Banner"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/banner">
          Batal
        </Button>
      </div>
    </form>
  );
}
