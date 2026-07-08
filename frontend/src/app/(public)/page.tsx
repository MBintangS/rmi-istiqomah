import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
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
    </>
  );
}
