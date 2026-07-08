import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { mockDonasi, mockSettings } from "@/data/mock";

export const metadata: Metadata = {
  title: "Donasi",
  description: "Dukung kegiatan Remaja Masjid Istiqomah melalui donasi.",
};

export default function DonasiPage() {
  const { whatsapp } = mockSettings;

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Donasi" },
            ]}
            className="mb-4"
          />
          <h1>{mockDonasi.title}</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">{mockDonasi.description}</p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {mockDonasi.accounts.map((account) => (
              <div
                key={account.accountNumber}
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

          <p className="text-body mt-8 text-center text-foreground/70">{mockDonasi.notes}</p>

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
