"use client";

import Link from "next/link";
import { EmptyState, SkeletonList } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useOpenPendaftaran } from "@/hooks/usePendaftaran";
import { getApiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function OpenPendaftaranSection() {
  const { data, isPending, isError, error } = useOpenPendaftaran();
  const items = data ?? [];

  if (!isPending && !isError && items.length === 0) {
    return null;
  }

  return (
    <MotionSection tone="soft" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-secondary-alt">Sedang dibuka</p>
          <h2 className="mt-3 max-w-[16ch]">Pendaftaran kegiatan</h2>
        </div>

        {isPending ? (
          <SkeletonList count={3} />
        ) : isError ? (
          <EmptyState title="Gagal memuat pendaftaran" description={getApiErrorMessage(error)} />
        ) : (
          <div
            className={cn(
              "grid gap-4",
              items.length === 1 ? "max-w-lg" : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/pendaftaran?periode=${item.slug}`}
                className={cn(
                  "group flex h-full min-h-44 flex-col rounded-rmi border border-secondary/35 bg-background p-5",
                  "motion-safe:transition-colors motion-safe:duration-200 hover:border-secondary hover:bg-primary/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-caption font-medium text-primary">{item.program?.name ?? "Program RMI"}</p>
                  <span className="shrink-0 rounded-full bg-secondary/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                    Dibuka
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-bold leading-snug tracking-tight text-heading group-hover:text-primary">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="text-body mt-2 line-clamp-3 text-foreground/70">{item.description}</p>
                ) : (
                  <p className="text-body mt-2 text-foreground/50">Isi data diri untuk mendaftar periode ini.</p>
                )}
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-secondary/20 pt-4">
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">Buka</dt>
                    <dd className="mt-1 text-sm font-medium text-heading">{formatDay(item.opensAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">Tutup</dt>
                    <dd className="mt-1 text-sm font-medium text-heading">{formatDay(item.closesAt)}</dd>
                  </div>
                </dl>
                <span className="text-caption mt-5 inline-flex min-h-11 items-center font-semibold text-primary">
                  Isi formulir
                  <span className="ml-1 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
