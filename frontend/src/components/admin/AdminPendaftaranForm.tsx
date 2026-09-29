"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Textarea } from "@/components/ui";
import { usePrograms } from "@/hooks/usePrograms";
import { getApiErrorMessage } from "@/lib/api";
import { pendaftaranFormSchema, toDatetimeLocalValue, type PendaftaranFormValues } from "@/lib/pendaftaran-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createPendaftaran, updatePendaftaran } from "@/services/pendaftaran.service";
import type { PendaftaranItem } from "@/types/api";

interface AdminPendaftaranFormProps {
  mode: "create" | "edit";
  initial?: PendaftaranItem;
}

export function AdminPendaftaranForm({ mode, initial }: AdminPendaftaranFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const programs = usePrograms();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PendaftaranFormValues>({
    resolver: zodResolver(pendaftaranFormSchema),
    defaultValues: {
      programId: initial?.program?.id ?? "",
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      opensAt: initial ? toDatetimeLocalValue(initial.opensAt) : "",
      closesAt: initial ? toDatetimeLocalValue(initial.closesAt) : "",
      isPublished: initial?.isPublished ?? false,
    },
  });

  const activePrograms = (programs.data ?? []).filter((item) => item.isActive);
  const currentMissing =
    initial?.program && !activePrograms.some((item) => item.id === initial.program?.id)
      ? initial.program
      : null;

  const saveMutation = useMutation({
    mutationFn: (values: PendaftaranFormValues) => {
      const payload = {
        programId: values.programId,
        title: values.title,
        description: values.description?.trim() || undefined,
        opensAt: new Date(values.opensAt).toISOString(),
        closesAt: new Date(values.closesAt).toISOString(),
        isPublished: values.isPublished,
      };

      if (mode === "edit" && initial) {
        return updatePendaftaran(initial.id, payload);
      }

      return createPendaftaran(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Pendaftaran berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.pendaftaran.all });
      router.push("/admin/pendaftaran");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="space-y-5 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="programId" required>
          Program
        </Label>
        <Select id="programId" error={Boolean(errors.programId)} {...register("programId")}>
          <option value="">Pilih program</option>
          {currentMissing ? (
            <option value={currentMissing.id}>{currentMissing.name}</option>
          ) : null}
          {activePrograms.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </Select>
        {errors.programId && <p className="text-caption text-red-600">{errors.programId.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" required>
          Judul
        </Label>
        <Input id="title" error={Boolean(errors.title)} placeholder="Pendaftaran Tahfidz 2026" {...register("title")} />
        {errors.title && <p className="text-caption text-red-600">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" rows={4} placeholder="Untuk siapa pendaftaran ini dibuka" {...register("description")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="opensAt" required>
            Tanggal buka
          </Label>
          <Input id="opensAt" type="datetime-local" error={Boolean(errors.opensAt)} {...register("opensAt")} />
          {errors.opensAt && <p className="text-caption text-red-600">{errors.opensAt.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="closesAt" required>
            Tanggal tutup
          </Label>
          <Input id="closesAt" type="datetime-local" error={Boolean(errors.closesAt)} {...register("closesAt")} />
          {errors.closesAt && <p className="text-caption text-red-600">{errors.closesAt.message}</p>}
        </div>
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
          <option value="false">Draf</option>
          <option value="true">Terbitkan</option>
        </Select>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending || programs.isLoading}>
          {saveMutation.isPending ? "Menyimpan..." : mode === "create" ? "Buka pendaftaran" : "Simpan perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/pendaftaran">
          Batal
        </Button>
      </div>
    </form>
  );
}
