import type { Dokumen } from "@/types";

export const mockDokumen: Dokumen[] = [
  {
    id: "doc-1",
    name: "Proposal Kegiatan RMI 2026",
    fileUrl: "#",
    fileSize: 245760,
    fileType: "pdf",
    category: "Proposal",
    description: "Rencana kegiatan tahunan Remaja Masjid Istiqomah.",
    isPublished: true,
    createdAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "doc-2",
    name: "Panduan Anggota Baru",
    fileUrl: "#",
    fileSize: 184320,
    fileType: "pdf",
    category: "Panduan",
    description: "Informasi dasar bagi calon anggota yang ingin bergabung dengan RMI.",
    isPublished: true,
    createdAt: "2026-02-01T08:00:00.000Z",
  },
  {
    id: "doc-3",
    name: "Laporan Kegiatan 2025",
    fileUrl: "#",
    fileSize: 512000,
    fileType: "pdf",
    category: "Laporan",
    description: "Ringkasan dokumentasi dan capaian kegiatan RMI sepanjang tahun 2025.",
    isPublished: true,
    createdAt: "2026-03-01T08:00:00.000Z",
  },
  {
    id: "doc-4",
    name: "Formulir Pendaftaran Sanlat",
    fileUrl: "#",
    fileSize: 98304,
    fileType: "doc",
    category: "Formulir",
    description: "Formulir pendaftaran peserta program Sanlat RMI.",
    isPublished: true,
    createdAt: "2026-05-10T08:00:00.000Z",
  },
];

export const mockDonasi = {
  title: "Dukung Kegiatan RMI",
  description:
    "Donasi Anda membantu keberlangsungan kegiatan dakwah, sosial, dan pembinaan remaja masjid Istiqomah.",
  accounts: [
    {
      bank: "Bank Syariah Indonesia (BSI)",
      accountNumber: "7123456789",
      accountName: "Remaja Masjid Istiqomah",
    },
    {
      bank: "Bank Mandiri",
      accountNumber: "1234567890",
      accountName: "Remaja Masjid Istiqomah",
    },
  ],
  notes: "Konfirmasi donasi dapat disampaikan melalui WhatsApp pengurus RMI.",
};
