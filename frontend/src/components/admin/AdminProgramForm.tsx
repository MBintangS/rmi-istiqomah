"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { programFormSchema, type ProgramFormValues } from "@/lib/organisasi-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createProgram, updateProgram } from "@/services/program.service";
import { uploadImage } from "@/services/upload.service";
import type { ProgramDetail } from "@/types/api";

interface AdminProgramFormProps {
  mode: "create" | "edit";
  initial?: ProgramDetail;
}

export function AdminProgramForm({ mode, initial }: AdminProgramFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      content: initial?.content ?? "",
      image: initial?.image ?? "",
      icon: initial?.icon ?? "",
      isActive: initial?.isActive ?? true,
    },
  });

  const image = watch("image");

  const saveMutation = useMutation({
    mutationFn: async (values: ProgramFormValues) => {
      const payload = {
        name: values.name,
        description: values.description || undefined,
        content: values.content,
        image: values.image || undefined,
        icon: values.icon || undefined,
        isActive: values.isActive,
      };

      if (mode === "edit" && initial) {
        return updateProgram(initial.id, payload);
      }

      return createProgram(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Program berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.program.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/admin/program");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "program");
      setValue("image", result.url, { shouldValidate: true });
      toast.success("Gambar program berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload gambar"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Nama Program
            </Label>
            <Input id="name" error={Boolean(errors.name)} {...register("name")} />
            {errors.name && <p className="text-caption text-red-600">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi singkat</Label>
            <Textarea id="description" rows={3} {...register("description")} />
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
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="imageFile">Gambar</Label>
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
            {image ? (
              <div className="relative mt-2 aspect-video overflow-hidden rounded-rmi border border-foreground/10">
                <Image src={image} alt="Preview program" fill className="object-cover" sizes="320px" />
              </div>
            ) : null}
            <input type="hidden" {...register("image")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (opsional)</Label>
            <Input id="icon" placeholder="book / users / heart" {...register("icon")} />
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
      </div>

      <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || uploading}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Program"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/program">
          Batal
        </Button>
      </div>
    </form>
  );
}
