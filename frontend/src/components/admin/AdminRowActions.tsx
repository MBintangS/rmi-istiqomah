import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

function IconPencil({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function IconTrash({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10.7 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.2 3.2" />
      <path d="M6.6 6.6C3.9 8.5 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.4-1" />
      <path d="M14.1 9.9a3 3 0 0 1-4.2 4.2" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

function IconPower({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a8 8 0 1 1-12.8 0" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

const actionBase =
  "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-40";

export function AdminRowActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

export function AdminEditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={cn(actionBase, "text-primary hover:bg-primary/10")}
      aria-label="Edit"
      title="Edit"
    >
      <IconPencil />
    </Link>
  );
}

export function AdminEditButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(actionBase, "text-primary hover:bg-primary/10")}
      aria-label="Edit"
      title="Edit"
    >
      <IconPencil />
    </button>
  );
}

export function AdminDeleteButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(actionBase, "text-red-600 hover:bg-red-50")}
      aria-label="Hapus"
      title="Hapus"
    >
      <IconTrash />
    </button>
  );
}

export function AdminPublishButton({
  published,
  onClick,
  disabled,
}: {
  published: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const label = published ? "Unpublish" : "Publish";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(actionBase, "text-foreground/65 hover:bg-surface hover:text-primary")}
      aria-label={label}
      title={label}
    >
      {published ? <IconEyeOff /> : <IconEye />}
    </button>
  );
}

export function AdminToggleActiveButton({
  active,
  onClick,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const label = active ? "Nonaktifkan" : "Aktifkan";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        actionBase,
        active
          ? "text-foreground/65 hover:bg-surface hover:text-primary"
          : "text-primary hover:bg-primary/10",
      )}
      aria-label={label}
      title={label}
    >
      <IconPower />
    </button>
  );
}

export function AdminDownloadLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(actionBase, "text-foreground/65 hover:bg-surface hover:text-primary")}
      aria-label="Unduh"
      title="Unduh"
    >
      <IconDownload />
    </a>
  );
}

/** Escape hatch for rare custom icon actions */
export function AdminIconButton({
  label,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(actionBase, "text-foreground/65 hover:bg-surface hover:text-primary", className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
