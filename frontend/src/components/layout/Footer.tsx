"use client";

import Link from "next/link";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { socialIcons } from "@/components/brand/socialIcons";
import { mainNavItems } from "@/lib/navigation";
import { useSettingsValue } from "@/hooks/useSettings";

export function Footer() {
  const { siteName, tagline, address, phone, email, socialMedia, googleMapsEmbed } =
    useSettingsValue();

  return (
    <footer className="bg-ink text-on-ink">
      <div className="relative h-0.5 w-full bg-secondary" aria-hidden="true">
        <span className="absolute left-[12%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-secondary" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <RmiLogo size={36} />
              <span className="font-display text-lg font-semibold">{siteName}</span>
            </div>
            <p className="text-sm leading-relaxed text-on-ink/70">{tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-on-ink">Navigasi</h3>
            <ul className="space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-ink/70 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-on-ink">Kontak</h3>
            <ul className="space-y-2 text-sm text-on-ink/70">
              <li>{address}</li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-secondary">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-secondary">
                  {email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {(
                Object.entries(socialMedia) as [
                  keyof typeof socialIcons,
                  string | undefined,
                ][]
              )
                .filter(([, url]) => url)
                .map(([key, url]) => {
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="rounded-full p-2 text-on-ink/70 transition-colors hover:bg-primary/20 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-on-ink">Lokasi</h3>
            {googleMapsEmbed ? (
              <div className="overflow-hidden rounded-rmi">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Masjid Istiqomah"
                  className="w-full"
                />
              </div>
            ) : (
              <p className="text-sm text-on-ink/70">{address}</p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-on-ink/10 pt-6 text-sm text-on-ink/70">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
