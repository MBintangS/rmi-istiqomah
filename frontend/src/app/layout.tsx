import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
