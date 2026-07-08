import Image from "next/image";
import { Button } from "@/components/ui";
import { mockSettings } from "@/data/mock";

const heroImage =
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1600&q=80";

export function HeroSection() {
  const { siteName, tagline } = mockSettings;

  return (
    <section className="relative min-h-[70vh] overflow-hidden sm:min-h-[85vh]">
      <Image
        src={heroImage}
        alt="Kegiatan remaja masjid"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-heading/90 via-heading/70 to-heading/40" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[85vh] sm:px-6 sm:py-20 lg:px-8">
        <p className="text-caption mb-3 font-medium uppercase tracking-widest text-secondary sm:mb-4">
          {tagline}
        </p>
        <h1 className="max-w-3xl text-white">{siteName}</h1>
        <p className="text-body mt-4 max-w-xl text-surface/80">
          Wadah pembinaan generasi muda yang istiqomah dalam beribadah, berdakwah, dan
          berkontribusi untuk kemajuan masjid.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Button href="/kegiatan" size="lg" className="w-full sm:w-auto">
            Lihat Kegiatan
          </Button>
          <Button href="/kontak" variant="secondary" size="lg" className="w-full sm:w-auto">
            Gabung Bersama Kami
          </Button>
        </div>
      </div>
    </section>
  );
}
