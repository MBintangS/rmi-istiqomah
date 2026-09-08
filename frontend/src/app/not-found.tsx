import { JejakLine } from "@/components/layout/JejakLine";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Button } from "@/components/ui";
import { SITE_NAME } from "@/lib/seo";

export default function NotFound() {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-[calc(100vh-4rem)] flex-col justify-center bg-background px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-display text-6xl font-bold tracking-tight text-primary sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 max-w-[16ch] text-3xl sm:text-4xl">Halaman ini tidak ada di jejak RMI</h1>
          <p className="text-body mt-4 max-w-[48ch] text-foreground/70">
            Alamat yang dibuka mungkin sudah dipindahkan. Kembali ke beranda {SITE_NAME} atau lihat
            kegiatan yang sedang berjalan.
          </p>
          <JejakLine className="mt-8 max-w-xs" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Kembali ke Beranda</Button>
            <Button href="/kegiatan" variant="outline">
              Lihat Kegiatan
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
