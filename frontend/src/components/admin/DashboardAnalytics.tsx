"use client";

import { useState } from "react";
import Link from "next/link";
import { AnalyticsTrendChart } from "@/components/admin/AnalyticsTrendChart";
import { AdminPanel, AdminTableHead } from "@/components/admin/AdminChrome";
import { EmptyState, Skeleton } from "@/components/ui";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";
import { getApiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { DashboardAnalyticsTotals } from "@/types/api";

function formatCount(value: number) {
  return value.toLocaleString("id-ID");
}

const periodCards: Array<{
  key: "today" | "yesterday" | "last30Days" | "last365Days";
  label: string;
  hint: string;
}> = [
  { key: "today", label: "Hari ini", hint: "Tayangan hari ini" },
  { key: "yesterday", label: "Kemarin", hint: "Tayangan kemarin" },
  { key: "last30Days", label: "30 hari", hint: "Total sebulan terakhir" },
  { key: "last365Days", label: "12 bulan", hint: "Total setahun terakhir" },
];

function PeriodCard({
  label,
  hint,
  totals,
}: {
  label: string;
  hint: string;
  totals: DashboardAnalyticsTotals;
}) {
  return (
    <article className="rounded-rmi border border-foreground/10 bg-background px-4 py-3.5 shadow-[0_1px_2px_rgba(20,32,10,0.04)]">
      <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
        {formatCount(totals.pageViews)}
      </p>
      <p className="mt-1 text-[11px] text-foreground/40">
        {formatCount(totals.activeUsers)} pengunjung · {hint}
      </p>
    </article>
  );
}

export function DashboardAnalytics() {
  const { data, isLoading, isError, error, refetch } = useDashboardAnalytics();
  const [grain, setGrain] = useState<"day" | "month">("day");

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-heading">Kunjungan website</h3>
          <p className="text-caption text-foreground/55">
            {data?.configured
              ? "Google Analytics 4. Data bisa tertunda hingga 24–48 jam; Total hari ini dan Kemarin bisa jadi belum lengkap."
              : "Ringkasan pengunjung dari Google Analytics."}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[5.5rem] w-full rounded-rmi" />
          ))}
          <Skeleton className="h-56 w-full rounded-rmi sm:col-span-2 xl:col-span-4" />
        </div>
      ) : isError ? (
        <EmptyState
          title="Gagal memuat kunjungan"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : !data?.configured ? (
        <EmptyState
          title="Analytics belum dikonfigurasi"
          description="Isi GA4_PROPERTY_ID, GA4_CLIENT_EMAIL, dan GA4_PRIVATE_KEY di server, lalu restart aplikasi."
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {periodCards.map((card) => (
              <PeriodCard
                key={card.key}
                label={card.label}
                hint={card.hint}
                totals={data.periods[card.key]}
              />
            ))}
          </div>

          <AdminPanel padding="none">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/5 px-4 py-3">
              <h4 className="text-sm font-semibold tracking-tight text-heading">Tren pengunjung</h4>
              <div className="inline-flex rounded-md border border-foreground/10 p-0.5">
                {(
                  [
                    { id: "day", label: "28 hari" },
                    { id: "month", label: "12 bulan" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setGrain(option.id)}
                    className={cn(
                      "rounded px-2.5 py-1 text-[11px] font-medium transition-colors",
                      grain === option.id
                        ? "bg-primary text-white"
                        : "text-foreground/55 hover:text-heading",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <AnalyticsTrendChart
              series={grain === "day" ? data.seriesDaily : data.seriesMonthly}
              grain={grain}
            />
          </AdminPanel>

          <AdminPanel padding="none">
            {data.topPages.length === 0 ? (
              <div className="p-4">
                <EmptyState
                  title="Belum ada data halaman"
                  description="Kunjungan produksi akan muncul di sini setelah GA4 memproses laporan."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <AdminTableHead>
                    <tr>
                      <th className="px-3.5 py-2.5 font-medium">
                        Halaman teratas · {data.rangeDays} hari
                      </th>
                      <th className="px-3.5 py-2.5 text-right font-medium">Tayangan</th>
                    </tr>
                  </AdminTableHead>
                  <tbody>
                    {data.topPages.map((page) => (
                      <tr
                        key={`${page.path}:${page.title}`}
                        className="border-b border-foreground/5 last:border-0"
                      >
                        <td className="px-3.5 py-2.5">
                          <p className="font-medium text-heading">{page.title}</p>
                          <Link
                            href={page.path || "/"}
                            target="_blank"
                            rel="noreferrer"
                            className="text-caption text-primary hover:underline"
                          >
                            {page.path || "/"}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3.5 py-2.5 text-right tabular-nums text-foreground/70">
                          {formatCount(page.views)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminPanel>
        </>
      )}
    </section>
  );
}
