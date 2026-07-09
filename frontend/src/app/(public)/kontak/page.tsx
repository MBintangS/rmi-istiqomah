import { ContactForm } from "@/components/contact/ContactForm";
import { KontakInfo } from "@/components/kontak/KontakInfo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Kontak",
  description: "Hubungi Remaja Masjid Istiqomah: form kontak, alamat, dan peta lokasi.",
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Kontak" },
            ]}
            className="mb-4"
          />
          <h2>Hubungi Kami</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Ada pertanyaan atau ingin bergabung? Kirim pesan atau hubungi pengurus RMI langsung.
          </p>
        </div>
      </section>

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
