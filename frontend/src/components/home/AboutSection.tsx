"use client";

import Image from "next/image";
import { Button, Skeleton } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { useBanners } from "@/hooks/useBanners";
import { useSettingsValue } from "@/hooks/useSettings";
import { FALLBACK_ABOUT_IMAGE } from "@/lib/constants";

export function AboutSection() {
  const { about, vision, mission } = useSettingsValue();
  const { data: banners, isLoading: bannersLoading } = useBanners();

  const aboutImage = banners?.[1]?.image ?? banners?.[0]?.image ?? FALLBACK_ABOUT_IMAGE;

  return (
    <MotionSection tone="slide" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-rmi lg:col-span-5">
            {bannersLoading ? (
              <Skeleton className="h-full w-full rounded-rmi" />
            ) : (
              <Image
                src={aboutImage}
                alt="Aktivitas Remaja Masjid Istiqomah"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            )}
          </div>

          <div className="space-y-10 lg:col-span-7">
            <div className="space-y-5">
              <h2 className="max-w-[14ch]">Kenali Remaja Masjid Istiqomah</h2>
              <p className="text-body max-w-[58ch] text-foreground/75">{about}</p>
              <Button href="/tentang-kami" variant="outline">
                Selengkapnya
              </Button>
            </div>

            <div className="grid gap-10 border-t border-foreground/10 pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-primary">Visi</h3>
                <blockquote className="text-body mt-4 text-heading">
                  &ldquo;{vision}&rdquo;
                </blockquote>
              </div>
              <div>
                <h3 className="text-primary">Misi</h3>
                <ul className="mt-4 space-y-3">
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
