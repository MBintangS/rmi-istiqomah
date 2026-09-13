"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import {
  activateInvitationFormSchema,
  type ActivateInvitationFormValues,
} from "@/lib/user-form-schema";
import { activateUserInvitation } from "@/services/users.service";

export function ActivateInvitationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivateInvitationFormValues>({
    resolver: zodResolver(activateInvitationFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ActivateInvitationFormValues) => {
    setSubmitError(null);
    try {
      const response = await activateUserInvitation({ token, ...values });
      setSuccessEmail(response.data.email);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Aktivasi akun gagal"));
    }
  };

  if (successEmail) {
    return (
      <div className="space-y-5">
        <div
          className="rounded-rmi border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground"
          role="status"
        >
          Akun <strong>{successEmail}</strong> berhasil diaktifkan. Anda sekarang dapat login ke
          panel CMS.
        </div>
        <Button href="/admin/login" className="w-full">
          Lanjut ke Login
        </Button>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="space-y-5">
        <p className="rounded-rmi border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
          Tautan aktivasi tidak lengkap. Buka kembali tautan yang terdapat pada email undangan.
        </p>
        <Button href="/" variant="outline" className="w-full">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="password" required>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          error={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-caption text-red-600">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" required>
          Konfirmasi password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="Ulangi password"
          error={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-caption text-red-600">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      {submitError ? (
        <p
          className="rounded-rmi border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-700"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Mengaktifkan..." : "Aktifkan Akun"}
      </Button>
    </form>
  );
}
