import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: { absolute: "Remaja Masjid Istiqomah" },
  description:
    "Remaja Masjid Istiqomah (RMI): kegiatan, program, artikel Islami, dan ruang bergabung bagi generasi muda masjid.",
  path: "/",
});

function SectionFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-hidden="true">
      <Skeleton className="mb-6 h-8 w-48 rounded-rmi" />
      <Skeleton className="h-40 w-full rounded-rmi" />
    </div>
  );
}

const AboutSection = dynamic(
  () => import("@/components/home/AboutSection").then((m) => m.AboutSection),
  { loading: () => <SectionFallback /> },
);
const ProgramsSection = dynamic(
  () => import("@/components/home/ProgramsSection").then((m) => m.ProgramsSection),
  { loading: () => <SectionFallback /> },
);
const UpcomingEventsSection = dynamic(
  () =>
    import("@/components/home/UpcomingEventsSection").then((m) => m.UpcomingEventsSection),
  { loading: () => <SectionFallback /> },
);
const LatestArticlesSection = dynamic(
  () =>
    import("@/components/home/LatestArticlesSection").then((m) => m.LatestArticlesSection),
  { loading: () => <SectionFallback /> },
);
const GalleryPreviewSection = dynamic(
  () =>
    import("@/components/home/GalleryPreviewSection").then((m) => m.GalleryPreviewSection),
  { loading: () => <SectionFallback /> },
);
const StatsSection = dynamic(
  () => import("@/components/home/StatsSection").then((m) => m.StatsSection),
  { loading: () => <SectionFallback /> },
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/TestimonialsSection").then((m) => m.TestimonialsSection),
  { loading: () => <SectionFallback /> },
);

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
      <TestimonialsSection />
    </>
  );
}
