import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PublicThemeProvider } from "@/providers/PublicThemeProvider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicThemeProvider>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </PublicThemeProvider>
  );
}
