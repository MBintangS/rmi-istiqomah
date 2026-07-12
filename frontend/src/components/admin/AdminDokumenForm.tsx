"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { dokumenFormSchema, type DokumenFormValues } from "@/lib/organisasi-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createDokumen, updateDokumen } from "@/services/dokumen.service";
import { uploadFile } from "@/services/upload.service";
import type { DokumenListItem } from "@/types/api";

interface AdminDokumenFormProps {
  mode: "create" | "edit";
  initial?: DokumenListItem;
}

function formatFileSize(bytes: number | undefined) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminDokumenForm({ mode, initial }: AdminDokumenFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DokumenFormValues>({
    resolver: zodResolver(dokumenFormSchema),
    defaultValues: {
      name: initial?.name ?? "",
      fileUrl: initial?.fileUrl ?? "",
      fileSize: initial?.fileSize ?? undefined,
      fileType: initial?.fileType ?? "",
      category: initial?.category ?? "",
      description: initial?.description ?? "",
      isPublished: initial?.isPublished ?? false,
    },
  });

  const fileUrl = watch("fileUrl");
  const fileType = watch("fileType");
  const fileSize = watch("fileSize");

  const saveMutation = useMutation({
    mutationFn: async (values: DokumenFormValues) => {
      const payload = {
        name: values.name,
        fileUrl: values.fileUrl,
        fileSize: values.fileSize,
        fileType: values.fileType || undefined,
        category: values.category || undefined,
        description: values.description || undefined,
        isPublished: values.isPublished,
      };

      if (mode === "edit" && initial) {
        return updateDokumen(initial.id, payload);
      }

      return createDokumen(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Dokumen berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.dokumen.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/dokumen");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadFile(file, "dokumen");
      setValue("fileUrl", result.url, { shouldValidate: true });
      setValue("fileSize", result.bytes, { shouldValidate: true });
      setValue("fileType", result.format || file.name.split(".").pop() || "", {
        shouldValidate: true,
      });
      if (!watch("name")) {
        setValue("name", file.name.replace(/\.[^.]+$/, ""), { shouldValidate: true });
      }
      toast.success("File berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload file"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="mx-auto max-w-2xl space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Nama Dokumen
        </Label>
        <Input id="name" error={Boolean(errors.name)} {...register("name")} />
        {errors.name && <p className="text-caption text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file" required>
          File
        </Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,application/pdf"
          disabled={uploading}
          onChange={(event) => void handleUpload(event.target.files?.[0])}
        />
        {uploading && (
          <div className="flex items-center gap-2">
            <Spinner size="sm" label="Mengupload..." />
          </div>
        )}
        {errors.fileUrl && <p className="text-caption text-red-600">{errors.fileUrl.message}</p>}
        {fileUrl ? (
          <p className="text-caption text-foreground/70">
            File siap:{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {fileType ? `.${fileType}` : "lihat file"}
            </a>
            {fileSize ? ` · ${formatFileSize(fileSize)}` : ""}
          </p>
        ) : null}
        <input type="hidden" {...register("fileUrl")} />
        <input type="hidden" {...register("fileSize", { valueAsNumber: true })} />
        <input type="hidden" {...register("fileType")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Input id="category" placeholder="organisasi / laporan" {...register("category")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="isPublished" required>
            Status
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

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" rows={3} {...register("description")} />
      </div>

      <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Dokumen"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/dokumen">
          Batal
        </Button>
      </div>
    </form>
  );
}
