"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, Input, Label, Select, Spinner, Textarea } from "@/components/ui";
import { useKegiatan } from "@/hooks/useKegiatan";
import { getApiErrorMessage } from "@/lib/api";
import { dateInputToIso, toDateInputValue } from "@/lib/date-input";
import { agendaFormSchema, type AgendaFormValues } from "@/lib/kegiatan-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { createAgenda, updateAgenda } from "@/services/agenda.service";
import type { AgendaListItem } from "@/types/api";

interface AdminAgendaFormProps {
  mode: "create" | "edit";
  initial?: AgendaListItem;
}

export function AdminAgendaForm({ mode, initial }: AdminAgendaFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: kegiatanData, isLoading: kegiatanLoading } = useKegiatan({
    limit: 100,
    sort: "-dateStart",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AgendaFormValues>({
    resolver: zodResolver(agendaFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      date: toDateInputValue(initial?.date) || "",
      time: initial?.time ?? "",
      location: initial?.location ?? "",
      description: initial?.description ?? "",
      eventId: initial?.event?.id ?? "",
      isPublished: initial?.isPublished ?? false,
    },
  });

  useEffect(() => {
    if (initial?.event?.id) {
      setValue("eventId", initial.event.id);
    }
  }, [initial?.event?.id, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (values: AgendaFormValues) => {
      const payload = {
        title: values.title,
        date: dateInputToIso(values.date),
        time: values.time || undefined,
        location: values.location || undefined,
        description: values.description || undefined,
        eventId: values.eventId || undefined,
        isPublished: values.isPublished,
      };

      if (mode === "edit" && initial) {
        return updateAgenda(initial.id, payload);
      }

      return createAgenda(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Agenda berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.agenda.all });
      router.push("/admin/agenda");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  if (kegiatanLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Memuat form..." />
      </div>
    );
  }

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date" required>
            Tanggal
          </Label>
          <Input id="date" type="date" error={Boolean(errors.date)} {...register("date")} />
          {errors.date && <p className="text-caption text-red-600">{errors.date.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Waktu</Label>
          <Input id="time" placeholder="09:00 WIB" {...register("time")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input id="location" {...register("location")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" rows={4} {...register("description")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventId">Link ke Kegiatan (opsional)</Label>
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

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending}>
          {saveMutation.isPending
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Agenda"
              : "Simpan Perubahan"}
        </Button>
        <Button type="button" variant="outline" href="/admin/agenda">
          Batal
        </Button>
      </div>
    </form>
  );
}
