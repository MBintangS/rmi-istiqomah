import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { mockSettings } from "@/data/mock";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Kontak",
  description: "Hubungi Remaja Masjid Istiqomah: form kontak, alamat, dan peta lokasi.",
  path: "/kontak",
});

export default function KontakPage() {
  const { address, phone, email, whatsapp, googleMapsEmbed } = mockSettings;

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

          <div className="space-y-8">
            <div>
              <h2 className="mb-4">Informasi Kontak</h2>
              <ul className="text-body space-y-3 text-foreground/80">
                <li>
                  <span className="font-medium text-heading">Alamat:</span>
                  <br />
                  {address}
                </li>
                <li>
                  <span className="font-medium text-heading">Telepon:</span>
                  <br />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                    {phone}
                  </a>
                </li>
                <li>
                  <span className="font-medium text-heading">Email:</span>
                  <br />
                  <a href={`mailto:${email}`} className="text-primary hover:underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-medium text-heading">WhatsApp:</span>
                  <br />
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    +{whatsapp}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4">Lokasi</h2>
              <div className="overflow-hidden rounded-rmi border border-foreground/10 shadow-soft">
                <iframe
                  src={googleMapsEmbed}
                  title="Lokasi Masjid Istiqomah"
                  className="aspect-video w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
