"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { EmptyState, Spinner } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

interface SuperAdminGuardProps {
  children: ReactNode;
}

export function SuperAdminGuard({ children }: SuperAdminGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (user && user.role !== "superadmin") {
      router.replace("/admin/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Memeriksa akses..." />
      </div>
    );
  }

  if (!user || user.role !== "superadmin") {
    return (
      <EmptyState
        title="Akses ditolak"
        description="Halaman ini hanya untuk Super Admin."
        actionLabel="Ke Dashboard"
        onAction={() => router.replace("/admin/dashboard")}
      />
    );
  }

  return <>{children}</>;
}
