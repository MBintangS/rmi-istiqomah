"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label, Spinner } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";
import { loginFormSchema, type LoginFormValues } from "@/lib/login-schema";

function safeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/admin") || next.startsWith("/admin/login")) {
    return "/admin/dashboard";
  }
  return next;
}

export function AdminLoginForm() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isLoading, nextPath, router]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success("Login berhasil");
      router.replace(nextPath);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Email atau password salah"));
    }
  };

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex justify-center py-12">
        <Spinner label="Memuat..." />
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
          placeholder="admin@rmi-masjid.org"
          error={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && <p className="text-caption text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" required>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-caption text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Masuk..." : "Masuk"}
      </Button>

      <Button href="/" variant="outline" className="w-full">
        Kembali ke Beranda
      </Button>
    </form>
  );
}
