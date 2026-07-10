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
import { pengurusFormSchema, type PengurusFormValues } from "@/lib/organisasi-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createPengurus, updatePengurus } from "@/services/pengurus.service";
import { uploadImage } from "@/services/upload.service";
import type { PengurusListItem } from "@/types/api";

interface AdminPengurusFormProps {
  mode: "create" | "edit";
  initial?: PengurusListItem;
}

export function AdminPengurusForm({ mode, initial }: AdminPengurusFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PengurusFormValues>({
    resolver: zodResolver(pengurusFormSchema),
    defaultValues: {
      name: initial?.name ?? "",
      position: initial?.position ?? "",
      photo: initial?.photo ?? "",
      period: initial?.period ?? "",
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
    },
  });

  const photo = watch("photo");

  const saveMutation = useMutation({
    mutationFn: async (values: PengurusFormValues) => {
      const payload = {
        name: values.name,
        position: values.position,
        photo: values.photo || undefined,
        period: values.period || undefined,
        order: values.order,
        isActive: values.isActive,
      };

      if (mode === "edit" && initial) {
        return updatePengurus(initial.id, payload);
      }

      return createPengurus(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Pengurus berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.pengurus.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/pengurus");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "pengurus");
      setValue("photo", result.url, { shouldValidate: true });
      toast.success("Foto berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload foto"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="mx-auto max-w-2xl space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 sm:p-5"
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
        <Label htmlFor="position" required>
          Jabatan
        </Label>
        <Input id="position" error={Boolean(errors.position)} {...register("position")} />
        {errors.position && <p className="text-caption text-red-600">{errors.position.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="photoFile">Foto</Label>
        <Input
          id="photoFile"
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
        {photo ? (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-full border border-foreground/10">
            <Image src={photo} alt="Preview foto" fill className="object-cover" sizes="128px" />
          </div>
        ) : null}
        <input type="hidden" {...register("photo")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="period">Periode</Label>
          <Input id="period" placeholder="2024-2026" {...register("period")} />
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

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Pengurus"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/pengurus">
          Batal
        </Button>
      </div>
    </form>
  );
}
