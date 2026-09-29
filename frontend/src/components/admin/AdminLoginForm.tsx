"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label, Spinner } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { ApiRequestError, getApiErrorMessage } from "@/lib/api";
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
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);

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
      setRateLimitMessage(null);
      toast.success("Login berhasil");
      router.replace(nextPath);
    } catch (error) {
      const message = getApiErrorMessage(error, "Email atau password salah");
      if (error instanceof ApiRequestError && error.statusCode === 429) {
        // Lockout rate limit: tampilkan pesan + sisa tunggu secara persisten.
        setRateLimitMessage(message);
        toast.error("Terlalu banyak percobaan login");
      } else {
        setRateLimitMessage(null);
        toast.error(message);
      }
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
    <div className="space-y-5">
      {rateLimitMessage ? (
        <div
          role="alert"
          className="rounded-rmi border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-caption text-amber-600"
        >
          {rateLimitMessage}
        </div>
      ) : null}

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
    </div>
  );
}
