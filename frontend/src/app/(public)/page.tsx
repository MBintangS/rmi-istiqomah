import { AboutSection } from "@/components/home/AboutSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />
      <ProgramsSection />
    </>
  );
}
