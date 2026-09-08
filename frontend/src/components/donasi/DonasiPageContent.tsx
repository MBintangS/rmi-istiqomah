"use client";

import toast from "react-hot-toast";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { PageHero } from "@/components/layout/PageHero";
import { useDonasi } from "@/hooks/useDonasi";
import { useSettingsValue } from "@/hooks/useSettings";
import { getApiErrorMessage } from "@/lib/api";

const DONASI_INTRO = {
  title: "Dukung Kegiatan RMI",
  description:
    "Donasi Anda membantu keberlangsungan kegiatan dakwah, sosial, dan pembinaan remaja masjid Istiqomah.",
  notes: "Konfirmasi donasi dapat disampaikan melalui WhatsApp pengurus RMI.",
};

async function copyAccountNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number);
    toast.success("Nomor rekening disalin");
  } catch {
    toast.error("Tidak bisa menyalin. Silakan salin manual.");
  }
}

export function DonasiPageContent() {
  const { whatsapp } = useSettingsValue();
  const { data, isLoading, isError, error, refetch } = useDonasi();
  const accounts = data ?? [];

  return (
    <>
      <PageHero
        variant="utility"
        title={DONASI_INTRO.title}
        description={DONASI_INTRO.description}
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Donasi" },
        ]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="rounded-rmi border border-foreground/10 bg-surface p-6"
                >
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="mt-3 h-8 w-56" />
                  <Skeleton className="mt-2 h-5 w-48" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <EmptyState
              title="Gagal memuat rekening donasi"
              description={getApiErrorMessage(error)}
              actionLabel="Coba lagi"
              onAction={() => refetch()}
            />
          ) : accounts.length === 0 ? (
            <EmptyState
              title="Belum ada rekening donasi"
              description="Rekening donasi belum tersedia. Silakan cek kembali nanti."
            />
          ) : (
            <ul className="space-y-4">
              {accounts.map((account) => (
                <li
                  key={account.id}
                  className="rounded-rmi border border-foreground/10 bg-surface p-6"
                >
                  <p className="text-caption font-medium text-primary">{account.bank}</p>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-2xl font-bold tracking-wide text-heading">
                        {account.accountNumber}
                      </p>
                      <p className="text-body mt-1 text-foreground/80">a.n. {account.accountName}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyAccountNumber(account.accountNumber)}
                    >
                      Salin rekening
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="text-body mt-8 text-foreground/70">{DONASI_INTRO.notes}</p>

          <div className="mt-6">
            <Button
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Assalamualaikum, saya ingin konfirmasi donasi RMI.")}`}
              variant="secondary"
            >
              Konfirmasi via WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
