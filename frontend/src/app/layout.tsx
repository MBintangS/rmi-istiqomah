import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Toaster";
import { poppins } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remaja Masjid Istiqomah",
  description: "Website resmi Remaja Masjid Istiqomah (RMI)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
