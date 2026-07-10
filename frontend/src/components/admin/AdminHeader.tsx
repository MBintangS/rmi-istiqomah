"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

interface AdminHeaderProps {
  title: string;
  onOpenMenu?: () => void;
}

export function AdminHeader({ title, onOpenMenu }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-foreground/10 bg-surface px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onOpenMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            className="rounded-rmi p-2 text-heading transition-colors hover:bg-primary/10 lg:hidden"
            aria-label="Buka menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        )}
        <h1 className="truncate text-lg font-semibold text-heading">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-heading">{user?.name}</p>
          <p className="text-caption text-foreground/60">{user?.role}</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
