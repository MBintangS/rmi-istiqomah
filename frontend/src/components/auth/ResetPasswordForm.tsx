"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { resetPasswordFormSchema, type ResetPasswordFormValues } from "@/lib/user-form-schema";
import { submitPasswordReset } from "@/services/auth.service";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setSubmitError(null);
    try {
      const response = await submitPasswordReset({ token, ...values });
      setSuccessEmail(response.data.email);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Reset password gagal"));
    }
  };

  if (successEmail) {
    return (
      <div className="space-y-5">
        <div
          className="rounded-rmi border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground"
          role="status"
        >
          Password akun <strong>{successEmail}</strong> berhasil diubah. Sesi login yang masih
          terbuka di perangkat lain sudah tidak berlaku.
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
          Tautan reset tidak lengkap. Buka kembali tautan yang terdapat pada email reset password.
        </p>
        <Button href="/lupa-password" variant="outline" className="w-full">
          Minta tautan baru
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="password" required>
          Password baru
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
        {isSubmitting ? "Menyimpan..." : "Simpan password"}
      </Button>
    </form>
  );
}
