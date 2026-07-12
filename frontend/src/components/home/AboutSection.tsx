"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useBanners } from "@/hooks/useBanners";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useSettingsValue } from "@/hooks/useSettings";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export function AboutSection() {
  const mounted = useHasMounted();
  const { about, vision, mission } = useSettingsValue();
  const { data: banners } = useBanners();

  // Keep SSR/client first paint identical (always an <img>, same fallback src).
  const aboutImage = mounted
    ? (banners?.[1]?.image ?? banners?.[0]?.image ?? PLACEHOLDER_IMAGE)
    : PLACEHOLDER_IMAGE;

  return (
    <MotionSection tone="slide" className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:grid-cols-12 sm:gap-12 lg:gap-16">
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-rmi sm:col-span-5 sm:block">
            <Image
              src={aboutImage}
              alt="Aktivitas Remaja Masjid Istiqomah"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>

          <div className="space-y-8 sm:col-span-7 sm:space-y-10">
            <div className="space-y-4 sm:space-y-5">
              <h2 className="max-w-[14ch]">Kenali Remaja Masjid Istiqomah</h2>
              <p className="text-body max-w-[58ch] text-foreground/75">{about}</p>
              <Button href="/tentang-kami" variant="outline">
                Selengkapnya
              </Button>
            </div>

            <div className="grid gap-8 border-t border-foreground/10 pt-8 sm:gap-10 sm:pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-primary">Visi</h3>
                <blockquote className="text-body mt-3 text-heading sm:mt-4">
                  &ldquo;{vision}&rdquo;
                </blockquote>
              </div>
              <div>
                <h3 className="text-primary">Misi</h3>
                <ul className="mt-3 space-y-3 sm:mt-4">
                  {mission.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="text-body border-b border-foreground/10 pb-3 text-foreground/75 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
