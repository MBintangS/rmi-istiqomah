"use client";

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

export function DonasiPageContent() {
  const { whatsapp } = useSettingsValue();
  const { data, isLoading, isError, error, refetch } = useDonasi();
  const accounts = data ?? [];

  return (
    <>
      <PageHero
        title={DONASI_INTRO.title}
        description={DONASI_INTRO.description}
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Donasi" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="rounded-rmi border border-primary/20 bg-primary/5 p-6 shadow-soft"
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
            <div className="space-y-6">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="rounded-rmi border border-primary/20 bg-primary/5 p-6 shadow-soft"
                >
                  <p className="text-caption font-medium text-primary">{account.bank}</p>
                  <p className="mt-2 text-2xl font-bold tracking-wide text-heading">
                    {account.accountNumber}
                  </p>
                  <p className="text-body mt-1 text-foreground/80">a.n. {account.accountName}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-body mt-8 text-center text-foreground/70">{DONASI_INTRO.notes}</p>

          <div className="mt-8 flex justify-center">
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
