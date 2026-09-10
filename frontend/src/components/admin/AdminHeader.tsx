"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminUserAvatar } from "@/components/admin/AdminUserAvatar";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { roleLabel } from "@/lib/roles";

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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-foreground/10 bg-background/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onOpenMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            className="rounded-md p-2 text-heading transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
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
        <div className="min-w-0 border-l border-foreground/10 pl-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/40">
            Panel CMS
          </p>
          <h1 className="truncate font-display text-base font-semibold tracking-tight text-heading">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link
          href="/admin/profil"
          aria-label="Buka profil"
          className="flex min-w-0 items-center gap-2.5 rounded-rmi border border-transparent px-1 py-1 transition-colors hover:border-foreground/10 hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-tight text-heading">{user?.name}</p>
            <p className="text-[11px] text-foreground/50">{roleLabel(user?.role)}</p>
          </div>
          <AdminUserAvatar name={user?.name ?? "A"} avatar={user?.avatar} size={32} />
        </Link>
        <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
