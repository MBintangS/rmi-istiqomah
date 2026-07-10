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

  const roleLabel = user?.role === "superadmin" ? "Super Admin" : "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-foreground/10 bg-background/95 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onOpenMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            className="rounded-md p-2 text-heading transition-colors hover:bg-surface lg:hidden"
            aria-label="Buka menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/45">
            Panel CMS
          </p>
          <h1 className="truncate text-base font-semibold tracking-tight text-heading">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-heading">{user?.name}</p>
          <p className="text-[11px] text-foreground/55">{roleLabel}</p>
        </div>
        <span
          className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary sm:inline-flex"
          aria-hidden="true"
        >
          {(user?.name ?? "A").charAt(0).toUpperCase()}
        </span>
        <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
