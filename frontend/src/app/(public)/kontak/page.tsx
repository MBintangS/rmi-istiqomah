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
        title="Hubungi Kami"
        description="Ada pertanyaan atau ingin bergabung? Kirim pesan atau hubungi pengurus RMI langsung."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontak" },
        ]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6">Form Kontak</h2>
            <ContactForm />
          </div>

          <KontakInfo />
        </div>
      </section>
    </>
  );
}
