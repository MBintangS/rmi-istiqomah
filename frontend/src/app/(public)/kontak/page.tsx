import { ContactForm } from "@/components/contact/ContactForm";
import { KontakInfo } from "@/components/kontak/KontakInfo";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Kontak",
  description: "Hubungi Remaja Masjid Istiqomah: form kontak, alamat, dan peta lokasi.",
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <>
      <PageHero
        variant="utility"
        title="Hubungi Kami"
        description="Ada pertanyaan atau ingin bergabung? Kirim pesan atau hubungi pengurus RMI langsung."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontak" },
        ]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="rounded-rmi border border-foreground/10 bg-surface p-6 sm:p-8 lg:col-span-6">
            <h2 className="mb-6 text-2xl">Form Kontak</h2>
            <ContactForm />
          </div>

          <div className="lg:col-span-6">
            <KontakInfo />
          </div>
        </div>
      </section>
    </>
  );
}
