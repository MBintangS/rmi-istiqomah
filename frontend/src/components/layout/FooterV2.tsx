"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { SOCIAL_PLATFORMS } from "@/components/brand/socialIcons";
import { Button } from "@/components/ui";
import { useSettingsValue } from "@/hooks/useSettings";
import { mainNavItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

function FooterNavLink({ href, label, index }: { href: string; label: string; index: number }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-11 cursor-pointer items-baseline gap-3 py-1",
        "font-display text-lg font-semibold tracking-tight text-on-ink sm:text-xl",
        "motion-safe:transition-colors motion-safe:duration-200 hover:text-secondary",
        focusRing,
      )}
    >
      <span className="w-6 shrink-0 font-sans text-[11px] font-medium tabular-nums text-secondary" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative">
        {label}
        <span
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-secondary motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:hidden"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex min-h-11 cursor-pointer items-center text-on-ink/80",
        "motion-safe:transition-colors motion-safe:duration-200 hover:text-secondary",
        focusRing,
      )}
    >
      <span className="relative">
        {children}
        <span
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-secondary motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:hidden"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

export function FooterV2() {
  const { siteName, tagline, address, phone, email, whatsapp, socialMedia, googleMapsEmbed } =
    useSettingsValue();

  const socials = SOCIAL_PLATFORMS.filter((platform) => socialMedia[platform.key]);
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null;

  return (
    <footer className="relative isolate overflow-x-clip bg-ink text-on-ink">
      <div className="relative h-px w-full bg-secondary" aria-hidden="true">
        <span className="absolute left-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-secondary" />
        <span className="absolute right-[18%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-secondary/75" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl space-y-4">
            <h2 className="max-w-[11ch] text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-on-ink sm:text-5xl md:text-6xl">
              Yuk, gerak bareng.
            </h2>
            {tagline ? <p className="max-w-[38ch] text-body text-on-ink/70">{tagline}</p> : null}
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/kontak"
              className={cn(
                "inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full border border-on-ink/30 px-6 py-3 text-base font-medium text-on-ink",
                "motion-safe:transition-colors motion-safe:duration-200 hover:border-secondary/70 hover:bg-on-ink/10",
                "sm:w-auto",
                focusRing,
              )}
            >
              Hubungi kami
            </Link>
            <Button href="/donasi" size="lg" variant="secondary" className="min-h-11 w-full sm:w-auto">
              Dukung Kami
            </Button>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden border-t border-on-ink/10 pt-8 sm:mt-16 sm:pt-10">
          <p
            className="pointer-events-none -ml-2 select-none font-display text-[clamp(6rem,28vw,14rem)] font-extrabold leading-[0.74] tracking-tighter text-on-ink/[0.09] sm:-ml-4"
            aria-hidden="true"
          >
            RMI
          </p>
          <div className="relative mt-3 flex items-center gap-3 sm:-mt-10">
            <RmiLogo size={44} />
            <p className="font-display text-lg font-semibold tracking-tight text-on-ink">{siteName}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <nav className="md:col-span-1 lg:col-span-7" aria-label="Navigasi footer">
            <p className="mb-4 text-caption font-medium uppercase tracking-[0.18em] text-on-ink/60">
              Jelajah
            </p>
            <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {mainNavItems.map((item, index) => (
                <li key={item.href}>
                  <FooterNavLink href={item.href} label={item.label} index={index} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10 md:col-span-1 lg:col-span-5">
            <div>
              <p className="mb-3 text-caption font-medium uppercase tracking-[0.18em] text-on-ink/60">
                Hubungi
              </p>
              <address className="not-italic">
                <ul className="space-y-0.5 text-sm leading-relaxed text-on-ink/70">
                  {address ? <li className="max-w-[28ch] py-2">{address}</li> : null}
                  {email ? (
                    <li>
                      <ContactLink href={`mailto:${email}`}>{email}</ContactLink>
                    </li>
                  ) : null}
                </ul>
              </address>
            </div>

            {socials.length > 0 ? (
              <div>
                <p className="mb-3 text-caption font-medium uppercase tracking-[0.18em] text-on-ink/60">
                  Sosial
                </p>
                <ul className="flex flex-wrap gap-2">
                  {socials.map((platform) => {
                    const Icon = platform.Icon;
                    return (
                      <li key={platform.key}>
                        <a
                          href={socialMedia[platform.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={platform.label}
                          className={cn(
                            "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-on-ink/15 px-4",
                            "text-sm font-medium text-on-ink/80",
                            "motion-safe:transition-[color,border-color,background-color,transform] motion-safe:duration-200 motion-safe:ease-out",
                            "hover:border-secondary/70 hover:bg-primary/15 hover:text-secondary motion-safe:hover:-translate-y-px",
                            focusRing,
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {platform.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-on-ink/10 pt-6 text-caption text-on-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rotate-45 bg-secondary" aria-hidden="true" />
            Tetap istiqomah.
          </p>
        </div>
      </div>
    </footer>
  );
}
