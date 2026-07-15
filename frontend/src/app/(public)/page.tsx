import { AboutSection } from "@/components/home/AboutSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { LatestKegiatanSection } from "@/components/home/LatestKegiatanSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: { absolute: "Remaja Masjid Istiqomah" },
  description:
    "Remaja Masjid Istiqomah (RMI): kegiatan, program, artikel Islami, dan ruang bergabung bagi generasi muda masjid.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <UpcomingEventsSection />
      <LatestArticlesSection />
      <GalleryPreviewSection />
      <StatsSection />
      <LatestKegiatanSection />
      <TestimonialsSection />
    </>
  );
}
