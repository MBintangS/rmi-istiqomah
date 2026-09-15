"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { EmptyState, Spinner } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { isPengurusRole, isSuperAdminRole } from "@/lib/roles";

interface RoleGuardProps {
  children: ReactNode;
  hasAccess: (role: string | null | undefined) => boolean;
  description: string;
}

function RoleGuard({ children, hasAccess, description }: RoleGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (user && !hasAccess(user.role)) {
      router.replace("/admin/dashboard");
    }
  }, [hasAccess, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Memeriksa akses..." />
      </div>
    );
  }

  if (!user || !hasAccess(user.role)) {
    return (
      <EmptyState
        title="Akses ditolak"
        description={description}
        actionLabel="Ke Dashboard"
        onAction={() => router.replace("/admin/dashboard")}
      />
    );
  }

  return <>{children}</>;
}

export function PengurusGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard
      hasAccess={isPengurusRole}
      description="Halaman ini hanya untuk Pengurus dan Super Admin."
    >
      {children}
    </RoleGuard>
  );
}

export function SuperAdminGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard
      hasAccess={isSuperAdminRole}
      description="Halaman ini hanya untuk Super Admin."
    >
      {children}
    </RoleGuard>
  );
}
