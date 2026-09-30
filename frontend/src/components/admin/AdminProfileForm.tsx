"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AdminFormShell } from "@/components/admin/AdminChrome";
import { AdminUserAvatar } from "@/components/admin/AdminUserAvatar";
import { Button, Input, Label, Spinner } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";
import { profileFormSchema, type ProfileFormValues } from "@/lib/user-form-schema";
import { updateMyProfile } from "@/services/auth.service";
import { uploadImage } from "@/services/upload.service";

export function AdminProfileForm() {
  const { user, applySession } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(user?.avatar ?? "");
  const [changingPassword, setChangingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      avatar: user?.avatar ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!user) return;
    setPreview(user.avatar ?? "");
    reset({
      name: user.name,
      avatar: user.avatar ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const avatar = watch("avatar");

  const clearPasswordFields = () => {
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmPassword", "");
    clearErrors(["currentPassword", "newPassword", "confirmPassword"]);
  };

  const cancelPasswordChange = () => {
    setChangingPassword(false);
    clearPasswordFields();
  };

  const saveMutation = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      updateMyProfile({
        name: values.name,
        email: user?.email ?? "",
        avatar: values.avatar ?? "",
        ...(values.currentPassword ? { currentPassword: values.currentPassword } : {}),
        ...(values.newPassword ? { newPassword: values.newPassword } : {}),
      }),
    onSuccess: (result, values) => {
      applySession(result);
      setPreview(result.user.avatar ?? "");
      toast.success(
        values.newPassword ? "Profil dan password berhasil diperbarui" : "Profil berhasil diperbarui",
      );
      setChangingPassword(false);
      reset({
        name: result.user.name,
        avatar: result.user.avatar ?? "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, "avatar");
      setValue("avatar", result.url, { shouldValidate: false, shouldDirty: true });
      setPreview(result.url);
      toast.success("Foto profil berhasil diupload");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Gagal upload foto"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => {
        if (!changingPassword) {
          saveMutation.mutate(values);
          return;
        }

        let invalid = false;
        if (!values.currentPassword) {
          setError("currentPassword", { message: "Password saat ini wajib diisi" });
          invalid = true;
        }
        if (!values.newPassword) {
          setError("newPassword", { message: "Password baru wajib diisi" });
          invalid = true;
        }
        if (values.newPassword !== values.confirmPassword) {
          setError("confirmPassword", { message: "Konfirmasi password tidak sama" });
          invalid = true;
        }
        if (invalid) return;

        saveMutation.mutate(values);
      })}
      noValidate
    >
      <AdminFormShell narrow className="space-y-8">
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-heading">Foto profil</h3>
            <p className="text-caption mt-0.5 text-foreground/55">
              Tampil di header CMS. Gunakan foto persegi agar hasilnya rapi.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <AdminUserAvatar name={watch("name") || "A"} avatar={preview || avatar} size={80} className="text-lg" />
            <div className="space-y-2">
              <Label htmlFor="avatarFile">Unggah foto</Label>
              <Input
                id="avatarFile"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploading || isSubmitting}
                onChange={(event) => void handleUpload(event.target.files?.[0])}
              />
              {uploading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" label="Mengupload..." />
                </div>
              ) : null}
              {preview || avatar ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setValue("avatar", "", { shouldDirty: true });
                    setPreview("");
                  }}
                >
                  Hapus foto
                </Button>
              ) : null}
              <input type="hidden" {...register("avatar")} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Nama
            </Label>
            <Input id="name" autoComplete="name" error={Boolean(errors.name)} {...register("name")} />
            {errors.name ? <p className="text-caption text-red-600">{errors.name.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email ?? ""}
              readOnly
              className="cursor-default bg-surface text-foreground/70"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {changingPassword ? (
              <Button type="button" variant="ghost" size="sm" onClick={cancelPasswordChange}>
                Batal
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={() => setChangingPassword(true)}>
                Ganti password
              </Button>
            )}
          </div>

          {changingPassword ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" required>
                  Password saat ini
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  error={Boolean(errors.currentPassword)}
                  {...register("currentPassword")}
                />
                {errors.currentPassword ? (
                  <p className="text-caption text-red-600">{errors.currentPassword.message}</p>
                ) : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" required>
                    Password baru
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Minimal 8 karakter"
                    error={Boolean(errors.newPassword)}
                    {...register("newPassword")}
                  />
                  {errors.newPassword ? (
                    <p className="text-caption text-red-600">{errors.newPassword.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" required>
                    Konfirmasi password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Ulangi password baru"
                    error={Boolean(errors.confirmPassword)}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword ? (
                    <p className="text-caption text-red-600">{errors.confirmPassword.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || uploading || saveMutation.isPending}>
            {isSubmitting || saveMutation.isPending ? "Menyimpan..." : "Simpan profil"}
          </Button>
        </div>
      </AdminFormShell>
    </form>
  );
}
