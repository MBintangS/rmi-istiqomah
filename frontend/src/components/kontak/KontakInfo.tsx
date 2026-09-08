"use client";

import { useSettingsValue } from "@/hooks/useSettings";

export function KontakInfo() {
  const { address, phone, email, whatsapp, googleMapsEmbed } = useSettingsValue();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-5 text-2xl">Informasi Kontak</h2>
        <ul className="space-y-5">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
            <div>
              <p className="text-caption font-medium text-heading">Alamat</p>
              <p className="text-body mt-1 text-foreground/80">{address}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
            <div>
              <p className="text-caption font-medium text-heading">Telepon</p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-body mt-1 inline-block text-primary hover:underline"
              >
                {phone}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
            <div>
              <p className="text-caption font-medium text-heading">Email</p>
              <a href={`mailto:${email}`} className="text-body mt-1 inline-block text-primary hover:underline">
                {email}
              </a>
            </div>
          </li>
          {whatsapp ? (
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
              <div>
                <p className="text-caption font-medium text-heading">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body mt-1 inline-block text-primary hover:underline"
                >
                  +{whatsapp}
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </div>

      {googleMapsEmbed ? (
        <div>
          <h2 className="mb-4 text-2xl">Lokasi</h2>
          <div className="overflow-hidden rounded-rmi border border-foreground/10">
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
      ) : null}
    </div>
  );
}
