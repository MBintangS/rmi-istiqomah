"use client";

import type { ComponentType, SVGProps } from "react";
import { useReducedMotion } from "framer-motion";
import { SOCIAL_PLATFORMS } from "@/components/brand/socialIcons";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSettingsValue } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

const LOOP_COPIES = 6;

type PlatformIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface SocialItem {
  key: string;
  href: string;
  label: string;
  Icon: PlatformIcon;
}

function SocialPill({
  href,
  label,
  Icon,
  tabIndex,
}: {
  href: string;
  label: string;
  Icon: PlatformIcon;
  tabIndex?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      tabIndex={tabIndex}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-background/90 px-5 py-2.5 text-heading ring-1 ring-primary/20 backdrop-blur-md transition-colors hover:text-primary hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}

function MarqueeRow({ items, reverse = false }: { items: SocialItem[]; reverse?: boolean }) {
  const sequence = Array.from({ length: LOOP_COPIES }, () => items).flat();

  return (
    <div className="flex w-max">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          className={cn(
            "social-marquee-track flex items-center gap-3 pr-3",
            reverse && "social-marquee-track-reverse",
          )}
        >
          {sequence.map((item, index) => (
            <li key={`${copy}-${item.key}-${index}`} className="flex items-center gap-3">
              <SocialPill href={item.href} label={item.label} Icon={item.Icon} tabIndex={-1} />
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary" aria-hidden="true" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function SocialMarquee() {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();
  const reduce = mounted && !!prefersReduced;
  const { socialMedia } = useSettingsValue();

  const items = SOCIAL_PLATFORMS.flatMap((platform) => {
    const href = socialMedia[platform.key];
    if (!href) return [];
    return [{ key: platform.key, href, label: platform.label, Icon: platform.Icon }];
  });

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-6 sm:py-8" aria-labelledby="social-marquee-heading">
      <h2 id="social-marquee-heading" className="sr-only">
        Ikuti kami di media sosial
      </h2>

      {reduce ? (
        <ul className="flex flex-wrap items-center justify-center gap-3 px-4">
          {items.map((item) => (
            <li key={item.key}>
              <SocialPill href={item.href} label={item.label} Icon={item.Icon} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <nav className="sr-only" aria-label="Tautan media sosial">
            <ul>
              {items.map((item) => (
                <li key={item.key}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="group space-y-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-hidden="true"
          >
            <div className="overflow-hidden">
              <MarqueeRow items={items} />
            </div>
            {/* <div className="overflow-hidden">
              <MarqueeRow items={[...items].reverse()} reverse />
            </div> */}
          </div>
        </>
      )}
    </section>
  );
}
