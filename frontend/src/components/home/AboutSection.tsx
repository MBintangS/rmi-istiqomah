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

  const aboutImage = mounted
    ? (banners?.[1]?.image ?? banners?.[0]?.image ?? PLACEHOLDER_IMAGE)
    : PLACEHOLDER_IMAGE;

  return (
    <MotionSection tone="slide" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-rmi sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src={aboutImage}
              alt="Aktivitas Remaja Masjid Istiqomah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <h2 className="max-w-[14ch]">Kenali Remaja Masjid Istiqomah</h2>
              <p className="text-body max-w-[58ch] text-foreground/75">{about}</p>
              <Button href="/tentang-kami" variant="outline">
                Selengkapnya
              </Button>
            </div>

            <div className="grid gap-8 border-t border-foreground/10 pt-8 md:grid-cols-2">
              <div>
                <h3 className="text-primary">Visi</h3>
                <blockquote className="text-body mt-3 text-heading">
                  &ldquo;{vision}&rdquo;
                </blockquote>
              </div>
              <div>
                <h3 className="text-primary">Misi</h3>
                <ul className="mt-3 space-y-3">
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
