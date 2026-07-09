"use client";

import { useSettingsValue } from "@/hooks/useSettings";

export function KontakInfo() {
  const { address, phone, email, whatsapp, googleMapsEmbed } = useSettingsValue();

  return (
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
          {whatsapp && (
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
          )}
        </ul>
      </div>

      {googleMapsEmbed && (
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
      )}
    </div>
  );
}
