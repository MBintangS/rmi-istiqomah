"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import { getApiErrorMessage } from "@/lib/api";
import { forgotPasswordFormSchema, type ForgotPasswordFormValues } from "@/lib/user-form-schema";
import { requestPasswordReset } from "@/services/auth.service";

export function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setSubmitError(null);
    try {
      const response = await requestPasswordReset(values);
      setSuccessMessage(
        response.message ??
          "Jika email terdaftar pada akun aktif, tautan reset password telah dikirim.",
      );
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Permintaan reset password gagal"));
    }
  };

  if (successMessage) {
    return (
      <div className="space-y-5">
        <div
          className="rounded-rmi border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground"
          role="status"
        >
          {successMessage} Periksa kotak masuk dan folder spam. Akun yang belum diaktifkan harus
          memakai tautan undangan, bukan reset password.
        </div>
        <Button href="/admin/login" className="w-full">
          Kembali ke Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          error={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? <p className="text-caption text-red-600">{errors.email.message}</p> : null}
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
        {isSubmitting ? "Mengirim..." : "Kirim tautan reset"}
      </Button>
      <Button href="/admin/login" variant="outline" className="w-full">
        Kembali ke Login
      </Button>
    </form>
  );
}
