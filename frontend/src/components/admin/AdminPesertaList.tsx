"use client";

import { AdminDataTable, AdminPanel, AdminTableHead } from "@/components/admin/AdminChrome";
import { Button, EmptyState, SkeletonList } from "@/components/ui";
import { useAdminPendaftaranById, usePeserta } from "@/hooks/usePendaftaran";
import { getApiErrorMessage } from "@/lib/api";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

export function AdminPesertaList({ id }: { id: string }) {
  const detail = useAdminPendaftaranById(id);
  const { data, isLoading, isError, error, refetch } = usePeserta(id);
  const items = data ?? [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body text-foreground/70">
          {detail.data ? detail.data.title : "Peserta pendaftaran"}
          {detail.data?.program ? ` · ${detail.data.program.name}` : ""}
        </p>
        <Button href="/admin/pendaftaran" variant="outline" size="sm">
          Kembali
        </Button>
      </div>

      {isLoading ? (
        <AdminPanel padding="sm">
          <SkeletonList count={4} />
        </AdminPanel>
      ) : isError ? (
        <AdminPanel>
          <EmptyState
            title="Gagal memuat peserta"
            description={getApiErrorMessage(error)}
            actionLabel="Coba lagi"
            onAction={() => refetch()}
          />
        </AdminPanel>
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState title="Belum ada peserta" description="Peserta muncul di sini setelah form publik dikirim." />
        </AdminPanel>
      ) : (
        <AdminDataTable>
          <AdminTableHead>
            <tr>
              <th className="px-3.5 py-2.5 font-medium">Nama</th>
              <th className="px-3.5 py-2.5 font-medium">Usia</th>
              <th className="px-3.5 py-2.5 font-medium">Alamat</th>
              <th className="px-3.5 py-2.5 font-medium">WhatsApp</th>
              <th className="px-3.5 py-2.5 font-medium">Email</th>
              <th className="px-3.5 py-2.5 font-medium">Catatan</th>
              <th className="px-3.5 py-2.5 font-medium">Waktu</th>
            </tr>
          </AdminTableHead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5 last:border-0">
                <td className="px-3.5 py-2.5 font-medium text-heading">{item.name}</td>
                <td className="px-3.5 py-2.5 tabular-nums text-foreground/80">{item.age ?? "—"}</td>
                <td className="max-w-xs px-3.5 py-2.5 text-caption text-foreground/70">{item.address || "—"}</td>
                <td className="px-3.5 py-2.5">
                  <a
                    href={`https://wa.me/${item.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {item.whatsapp}
                  </a>
                </td>
                <td className="px-3.5 py-2.5 text-caption text-foreground/70">{item.email || "—"}</td>
                <td className="max-w-xs px-3.5 py-2.5 text-caption text-foreground/70">{item.notes || "—"}</td>
                <td className="px-3.5 py-2.5 text-caption text-foreground/60">{formatWhen(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </AdminDataTable>
      )}
    </div>
  );
}
