import Link from "next/link";
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
        className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 py-16 text-center"
      >
        <div className="mx-auto max-w-lg">
          <div className="mb-6 flex justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              RMI
            </span>
          </div>
          <p className="text-caption font-medium text-primary">404 - Halaman Tidak Ditemukan</p>
          <h1 className="mt-3">Maaf, halaman ini tidak ada</h1>
          <p className="text-body mt-4 text-foreground/70">
            Halaman yang Anda cari mungkin sudah dipindahkan atau alamat URL-nya salah.
            Kembali ke beranda {SITE_NAME} untuk melanjutkan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">Kembali ke Beranda</Button>
            <Link
              href="/kontak"
              className="text-button font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
