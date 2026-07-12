"use client";

import { useState } from "react";
import { AdminPanel, AdminTableHead } from "@/components/admin/AdminChrome";
import { Button, EmptyState, Modal, SkeletonList } from "@/components/ui";
import { useContactMessages } from "@/hooks/useContactMessages";
import { getApiErrorMessage } from "@/lib/api";
import { formatArticleDate } from "@/lib/format-date";
import type { ContactMessageListItem } from "@/types/api";

export function DashboardContactMessages() {
  const { data, isLoading, isError, error, refetch } = useContactMessages();
  const [selected, setSelected] = useState<ContactMessageListItem | null>(null);
  const items = data ?? [];

  return (
    <section id="pesan-kontak" className="scroll-mt-20 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-heading">Pesan kontak</h3>
          <p className="text-caption text-foreground/55">
            Pesan dari formulir halaman Kontak.
          </p>
        </div>
        {!isLoading && !isError ? (
          <span className="rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-foreground/55">
            {items.length} pesan
          </span>
        ) : null}
      </div>

      <AdminPanel padding="none">
        {isLoading ? (
          <div className="p-4">
            <SkeletonList count={3} />
          </div>
        ) : isError ? (
          <div className="p-4">
            <EmptyState
              title="Gagal memuat pesan"
              description={getApiErrorMessage(error)}
              actionLabel="Coba lagi"
              onAction={() => refetch()}
            />
          </div>
        ) : items.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="Belum ada pesan"
              description="Pesan dari pengunjung akan muncul di sini."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <AdminTableHead>
                <tr>
                  <th className="px-3.5 py-2.5 font-medium">Tanggal</th>
                  <th className="px-3.5 py-2.5 font-medium">Pengirim</th>
                  <th className="px-3.5 py-2.5 font-medium">WhatsApp</th>
                  <th className="px-3.5 py-2.5 font-medium">Subjek</th>
                  <th className="px-3.5 py-2.5 font-medium">Pesan</th>
                  <th className="px-3.5 py-2.5 font-medium">Aksi</th>
                </tr>
              </AdminTableHead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-foreground/5 transition-colors hover:bg-surface/70 last:border-0"
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
                      {item.whatsapp ? item.whatsapp : "-"}
                    </td>
                    <td className="max-w-[10rem] truncate px-3.5 py-2.5 font-medium text-foreground/80">
                      {item.subject}
                    </td>
                    <td className="max-w-xs px-3.5 py-2.5 text-foreground/70">
                      <p className="truncate" title={item.message}>
                        {item.message}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3.5 py-2.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(item)}
                      >
                        Lihat pesan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminPanel>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.subject ?? "Pesan kontak"}
        className="sm:max-w-lg"
      >
        {selected ? (
          <div className="space-y-4">
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-caption text-foreground/50">Tanggal</dt>
                <dd className="mt-0.5 text-foreground/80">
                  {formatArticleDate(selected.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-caption text-foreground/50">Pengirim</dt>
                <dd className="mt-0.5 font-medium text-heading">{selected.name}</dd>
                <dd className="mt-0.5">
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                    {selected.email}
                  </a>
                </dd>
              </div>
              {selected.whatsapp ? (
                <div>
                  <dt className="text-caption text-foreground/50">WhatsApp</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selected.whatsapp}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="rounded-rmi border border-foreground/10 bg-surface/60 p-3.5">
              <p className="text-caption mb-2 text-foreground/50">Pesan</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                {selected.message}
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => setSelected(null)}>
                Tutup
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
