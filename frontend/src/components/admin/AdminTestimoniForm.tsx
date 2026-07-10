"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { testimoniFormSchema, type TestimoniFormValues } from "@/lib/cms-support-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createTestimoni, updateTestimoni } from "@/services/testimoni.service";
import { uploadImage } from "@/services/upload.service";
import type { TestimoniListItem } from "@/types/api";

interface AdminTestimoniFormProps {
  mode: "create" | "edit";
  initial?: TestimoniListItem;
}

export function AdminTestimoniForm({ mode, initial }: AdminTestimoniFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimoniFormValues>({
    resolver: zodResolver(testimoniFormSchema),
    defaultValues: {
      name: initial?.name ?? "",
      content: initial?.content ?? "",
      role: initial?.role ?? "",
      photo: initial?.photo ?? "",
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
    },
  });

  const photo = watch("photo");

  const saveMutation = useMutation({
    mutationFn: async (values: TestimoniFormValues) => {
      const payload = {
        name: values.name,
        content: values.content,
        role: values.role || undefined,
        photo: values.photo || undefined,
        order: values.order,
        isActive: values.isActive,
      };

      if (mode === "edit" && initial) {
        return updateTestimoni(initial.id, payload);
      }

      return createTestimoni(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Testimoni berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.testimoni.all });
      router.push("/admin/testimoni");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "testimoni");
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
        <Label htmlFor="role">Peran / Jabatan</Label>
        <Input id="role" placeholder="Anggota RMI" {...register("role")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" required>
          Isi Testimoni
        </Label>
        <Textarea id="content" rows={4} error={Boolean(errors.content)} {...register("content")} />
        {errors.content && <p className="text-caption text-red-600">{errors.content.message}</p>}
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
          <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-full border border-foreground/10">
            <Image src={photo} alt="Preview foto" fill className="object-cover" sizes="96px" />
          </div>
        ) : null}
        <input type="hidden" {...register("photo")} />
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
              ? "Buat Testimoni"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/testimoni">
          Batal
        </Button>
      </div>
    </form>
  );
}
