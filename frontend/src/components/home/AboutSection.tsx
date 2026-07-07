import Image from "next/image";
import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { mockSettings } from "@/data/mock";

const aboutImage =
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=800&q=80";

export function AboutSection() {
  const { about } = mockSettings;

  return (
    <MotionSection className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-rmi shadow-soft">
          <Image
            src={aboutImage}
            alt="Aktivitas Remaja Masjid Istiqomah"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-5">
          <p className="text-caption font-medium text-primary">Tentang RMI</p>
          <h2>Kenali Remaja Masjid Istiqomah</h2>
          <p className="text-body text-foreground/80">{about}</p>
          <Button href="/tentang-kami" variant="outline">
            Selengkapnya
          </Button>
        </div>
      </div>
    </MotionSection>
  );
}
