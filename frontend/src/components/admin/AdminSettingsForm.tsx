"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, EmptyState, Input, Label, Skeleton, Spinner, Textarea } from "@/components/ui";
import { useSettings } from "@/hooks/useSettings";
import { getApiErrorMessage } from "@/lib/api";
import { settingsFormSchema, type SettingsFormValues } from "@/lib/cms-support-form-schema";
import { queryKeys } from "@/lib/query-keys";
import { updateSettings } from "@/services/settings.service";

export function AdminSettingsForm() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch, isFetching } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteName: "",
      tagline: "",
      about: "",
      vision: "",
      missionText: "",
      address: "",
      phone: "",
      whatsapp: "",
      email: "",
      instagram: "",
      facebook: "",
      youtube: "",
      tiktok: "",
      googleMapsEmbed: "",
    },
  });

  useEffect(() => {
    if (!data) return;
    reset({
      siteName: data.siteName,
      tagline: data.tagline,
      about: data.about,
      vision: data.vision,
      missionText: data.mission.join("\n"),
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      instagram: data.socialMedia.instagram ?? "",
      facebook: data.socialMedia.facebook ?? "",
      youtube: data.socialMedia.youtube ?? "",
      tiktok: data.socialMedia.tiktok ?? "",
      googleMapsEmbed: data.googleMapsEmbed ?? "",
    });
  }, [data, reset]);

  const saveMutation = useMutation({
    mutationFn: (values: SettingsFormValues) =>
      updateSettings({
        siteName: values.siteName,
        tagline: values.tagline,
        about: values.about,
        vision: values.vision,
        mission: values.missionText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        address: values.address,
        phone: values.phone,
        whatsapp: values.whatsapp,
        email: values.email,
        socialMedia: {
          instagram: values.instagram || undefined,
          facebook: values.facebook || undefined,
          youtube: values.youtube || undefined,
          tiktok: values.tiktok || undefined,
        },
        googleMapsEmbed: values.googleMapsEmbed || "",
      }),
    onSuccess: (response) => {
      toast.success(response.message ?? "Pengaturan berhasil disimpan");
      void queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-rmi" />
        <Skeleton className="h-40 w-full rounded-rmi" />
        <div className="flex justify-center py-8">
          <Spinner label="Memuat pengaturan..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat pengaturan"
        description={getApiErrorMessage(error)}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
      className="mx-auto max-w-3xl space-y-6 rounded-rmi border border-foreground/10 bg-background p-4 shadow-[0_1px_2px_rgba(20,32,10,0.04)] sm:p-5"
      noValidate
    >
      <section className="space-y-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-heading">Profil Situs</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="siteName" required>
              Nama Situs
            </Label>
            <Input id="siteName" error={Boolean(errors.siteName)} {...register("siteName")} />
            {errors.siteName && (
              <p className="text-caption text-red-600">{errors.siteName.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="tagline" required>
              Tagline
            </Label>
            <Input id="tagline" error={Boolean(errors.tagline)} {...register("tagline")} />
            {errors.tagline && (
              <p className="text-caption text-red-600">{errors.tagline.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="about" required>
              Tentang
            </Label>
            <Textarea id="about" rows={4} error={Boolean(errors.about)} {...register("about")} />
            {errors.about && <p className="text-caption text-red-600">{errors.about.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="vision" required>
              Visi
            </Label>
            <Textarea id="vision" rows={3} error={Boolean(errors.vision)} {...register("vision")} />
            {errors.vision && <p className="text-caption text-red-600">{errors.vision.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="missionText" required>
              Misi (satu baris per poin)
            </Label>
            <Textarea
              id="missionText"
              rows={4}
              error={Boolean(errors.missionText)}
              {...register("missionText")}
            />
            {errors.missionText && (
              <p className="text-caption text-red-600">{errors.missionText.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-heading">Kontak</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address" required>
              Alamat
            </Label>
            <Textarea id="address" rows={2} error={Boolean(errors.address)} {...register("address")} />
            {errors.address && (
              <p className="text-caption text-red-600">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" required>
              Telepon
            </Label>
            <Input id="phone" error={Boolean(errors.phone)} {...register("phone")} />
            {errors.phone && <p className="text-caption text-red-600">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp" required>
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              placeholder="62812..."
              error={Boolean(errors.whatsapp)}
              {...register("whatsapp")}
            />
            {errors.whatsapp && (
              <p className="text-caption text-red-600">{errors.whatsapp.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input id="email" type="email" error={Boolean(errors.email)} {...register("email")} />
            {errors.email && <p className="text-caption text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="googleMapsEmbed">Google Maps Embed URL</Label>
            <Input id="googleMapsEmbed" {...register("googleMapsEmbed")} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-base font-semibold tracking-tight text-heading">Media Sosial</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" placeholder="https://instagram.com/..." {...register("instagram")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" placeholder="https://facebook.com/..." {...register("facebook")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input id="youtube" placeholder="https://youtube.com/..." {...register("youtube")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input id="tiktok" placeholder="https://tiktok.com/..." {...register("tiktok")} />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-foreground/10 pt-4">
        <Button type="submit" disabled={isSubmitting || saveMutation.isPending}>
          {saveMutation.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
        {isFetching && !isLoading ? (
          <span className="text-caption text-foreground/50">Menyegarkan data...</span>
        ) : null}
      </div>
    </form>
  );
}
