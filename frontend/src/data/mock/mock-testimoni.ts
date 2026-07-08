import type { Testimoni } from "@/types";

export const mockTestimoni: Testimoni[] = [
  {
    id: "tst-1",
    name: "Ahmad Rizki",
    role: "Anggota RMI sejak 2020",
    content:
      "Bergabung dengan RMI mengubah cara saya memahami Islam. Kajian rutin dan kegiatan sosial membuat saya lebih dekat dengan masjid dan teman sebaya yang positif.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    order: 1,
    isActive: true,
  },
  {
    id: "tst-2",
    name: "Siti Nurhaliza",
    role: "Ketua Bidang Dakwah 2024–2026",
    content:
      "RMI memberi ruang bagi remaja untuk berkontribusi nyata di masjid. Dari mengelola acara hingga bakti sosial, semua pengalaman di sini sangat berharga.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    order: 2,
    isActive: true,
  },
  {
    id: "tst-3",
    name: "Ustadz Fauzan",
    role: "Pembina RMI",
    content:
      "Saya bangga melihat generasi muda yang istiqomah dan aktif berdakwah. RMI bukan sekadar organisasi, tapi keluarga besar yang saling menguatkan.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    order: 3,
    isActive: true,
  },
];
