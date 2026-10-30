import type { LangkahWuduBelajar } from "@/types/belajar";

export const LANGKAH_WUDU_BELAJAR: LangkahWuduBelajar[] = [
  {
    id: "niat",
    label: "Niat dan membaca basmalah",
    detail: "Niatkan di dalam hati bahwa kamu berwudu untuk menghilangkan hadas kecil, lalu ucapkan bismillah.",
    hukum: "Niat fardu, basmalah sunnah",
    fardu: true,
  },
  {
    id: "tangan",
    label: "Membasuh kedua telapak tangan",
    detail: "Basuh kedua telapak tangan sampai pergelangan. Ratakan air ke sela-sela jari.",
    hukum: "Sunnah",
    fardu: false,
    kali: "3 kali",
  },
  {
    id: "kumur",
    label: "Berkumur-kumur",
    detail: "Ambil air dengan tangan kanan, masukkan ke mulut, kumur-kumur, lalu buang.",
    hukum: "Sunnah",
    fardu: false,
    kali: "3 kali",
  },
  {
    id: "hidung",
    label: "Membersihkan hidung",
    detail: "Hirup sedikit air ke dalam hidung dengan tangan kanan, lalu keluarkan dengan tangan kiri.",
    hukum: "Sunnah",
    fardu: false,
    kali: "3 kali",
  },
  {
    id: "wajah",
    label: "Membasuh wajah",
    detail:
      "Basuh seluruh wajah, dari tempat tumbuh rambut di dahi sampai bawah dagu, dan dari telinga kanan sampai telinga kiri.",
    hukum: "Fardu",
    fardu: true,
    kali: "3 kali",
  },
  {
    id: "lengan",
    label: "Membasuh tangan sampai siku",
    detail: "Basuh tangan kanan dulu, dari ujung jari sampai melewati siku. Setelah itu tangan kiri.",
    hukum: "Fardu",
    fardu: true,
    kali: "3 kali",
  },
  {
    id: "kepala",
    label: "Mengusap kepala dan telinga",
    detail: "Usap kepala dengan tangan yang basah, lalu usap kedua telinga bagian luar dan dalam.",
    hukum: "Kepala fardu, telinga sunnah",
    fardu: true,
  },
  {
    id: "kaki",
    label: "Membasuh kaki sampai mata kaki",
    detail: "Basuh kaki kanan dulu sampai melewati mata kaki dan ratakan ke sela-sela jari. Setelah itu kaki kiri.",
    hukum: "Fardu",
    fardu: true,
    kali: "3 kali",
  },
];

export const FARDU_WUDU = [
  "Niat",
  "Membasuh wajah",
  "Membasuh kedua tangan sampai siku",
  "Mengusap sebagian kepala",
  "Membasuh kedua kaki sampai mata kaki",
  "Tertib, dikerjakan berurutan",
];

export const PEMBATAL_WUDU = [
  "Keluar sesuatu dari kemaluan atau dubur, seperti buang air kecil, buang air besar, atau buang angin",
  "Tidur nyenyak yang tidak dalam posisi duduk tetap",
  "Hilang akal, misalnya pingsan atau mabuk",
  "Bersentuhan kulit dengan lawan jenis yang bukan mahram",
  "Menyentuh kemaluan dengan telapak tangan",
];

export const NIAT_WUDU = {
  arab: "نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى",
  latin: "Nawaitul wudhuu-a liraf'il hadatsil ashghari fardhal lillaahi ta'aalaa.",
  arti: "Aku berniat wudu untuk menghilangkan hadas kecil, fardu karena Allah Ta'ala.",
};

export const DOA_SESUDAH_WUDU = {
  arab: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ",
  latin:
    "Asyhadu an laa ilaaha illallaahu wahdahuu laa syariika lah, wa asyhadu anna muhammadan 'abduhuu wa rasuuluh. Allaahummaj'alnii minat tawwaabiina waj'alnii minal mutathahhiriin.",
  arti: "Aku bersaksi tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertobat dan orang-orang yang menyucikan diri.",
  sumber: "HR. Muslim dan At-Tirmidzi",
};
