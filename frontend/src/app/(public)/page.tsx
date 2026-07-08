import { AboutSection } from "@/components/home/AboutSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />
      <ProgramsSection />
      <UpcomingEventsSection />
      <LatestArticlesSection />
      <GalleryPreviewSection />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
