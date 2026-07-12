"use client";

import { EmptyState, SkeletonList } from "@/components/ui";
import { useContactMessages } from "@/hooks/useContactMessages";
import { getApiErrorMessage } from "@/lib/api";
import { formatArticleDate } from "@/lib/format-date";

export function DashboardContactMessages() {
  const { data, isLoading, isError, error, refetch } = useContactMessages();
  const items = data ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-heading">Pesan Kontak</h3>
        <p className="text-caption text-foreground/55">
          Pesan yang dikirim lewat formulir halaman Kontak.
        </p>
      </div>

      {isLoading ? (
        <SkeletonList count={3} />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat pesan"
          description={getApiErrorMessage(error)}
          actionLabel="Coba lagi"
          onAction={() => refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Belum ada pesan"
          description="Pesan dari pengunjung akan muncul di sini."
        />
      ) : (
        <div className="overflow-x-auto rounded-rmi border border-foreground/10 bg-background">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-foreground/10 bg-surface/80 text-[11px] font-medium uppercase tracking-wide text-foreground/55">
              <tr>
                <th className="px-3.5 py-2.5 font-medium">Tanggal</th>
                <th className="px-3.5 py-2.5 font-medium">Pengirim</th>
                <th className="px-3.5 py-2.5 font-medium">WhatsApp</th>
                <th className="px-3.5 py-2.5 font-medium">Subjek</th>
                <th className="px-3.5 py-2.5 font-medium">Pesan</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-foreground/5 align-top transition-colors hover:bg-surface/70 last:border-0"
                >
                  <td className="whitespace-nowrap px-3.5 py-2.5 text-foreground/60">
                    {formatArticleDate(item.createdAt)}
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="font-medium text-heading">{item.name}</p>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-caption text-primary hover:underline"
                    >
                      {item.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-3.5 py-2.5 text-foreground/70">
                    {item.whatsapp ? (
                      <a
                        href={`https://wa.me/${item.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {item.whatsapp}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3.5 py-2.5 font-medium text-foreground/80">{item.subject}</td>
                  <td className="max-w-md px-3.5 py-2.5 whitespace-pre-wrap text-foreground/70">
                    {item.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
