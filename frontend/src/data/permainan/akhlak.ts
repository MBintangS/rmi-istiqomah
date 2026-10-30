import type { KasusAkhlak } from "@/types/permainan";

export const KASUS_AKHLAK: KasusAkhlak[] = [
  {
    id: "gosip-grup",
    situation:
      "Di grup kelas, beberapa teman mulai menjelek-jelekkan satu teman yang tidak ada di grup itu.",
    options: [
      {
        text: "Ikut berkomentar supaya obrolannya makin seru.",
        best: false,
        feedback: "Membicarakan keburukan orang yang tidak hadir disebut ghibah. Ikut menambah komentar berarti ikut ghibah.",
      },
      {
        text: "Diam, tapi menyimpan tangkapan layarnya untuk diceritakan ke teman lain.",
        best: false,
        feedback: "Tidak ikut berkomentar sudah lebih baik, tapi menyebarkan tangkapan layar justru memperluas masalah.",
      },
      {
        text: "Mengingatkan dengan sopan, lalu mengajak membahas hal lain.",
        best: true,
        feedback: "Kamu menjaga kehormatan teman yang tidak hadir tanpa mempermalukan siapa pun di grup.",
      },
    ],
    source: "QS. Al-Hujurat 49:12 melarang ghibah dan mencari-cari kesalahan orang lain.",
  },
  {
    id: "contekan",
    situation: "Saat ulangan, teman di sebelahmu berbisik meminta jawaban nomor lima.",
    options: [
      {
        text: "Memberi jawaban diam-diam karena kasihan.",
        best: false,
        feedback: "Niat menolong itu baik, tapi memberi contekan tetap membantu kecurangan.",
      },
      {
        text: "Menolak dengan halus, lalu menawarkan belajar bareng setelah ulangan.",
        best: true,
        feedback: "Kamu menjaga kejujuran dan tetap peduli pada temanmu.",
      },
      {
        text: "Langsung melaporkannya ke guru dengan suara keras di depan kelas.",
        best: false,
        feedback: "Menjaga kejujuran itu penting, tapi mempermalukan teman di depan umum bukan cara yang terbaik.",
      },
    ],
    source: "Rasulullah ﷺ bersabda: \"Barang siapa menipu, maka ia bukan golongan kami.\" (HR. Muslim)",
  },
  {
    id: "kabar-viral",
    situation: "Kamu menerima pesan berantai: \"Besok sekolah libur!\" Tidak ada sumber yang jelas.",
    options: [
      {
        text: "Langsung meneruskannya ke semua grup.",
        best: false,
        feedback: "Kalau ternyata kabar itu salah, kamu ikut menyebarkan berita bohong ke banyak orang.",
      },
      {
        text: "Mengecek dulu ke wali kelas atau pengumuman resmi sekolah.",
        best: true,
        feedback: "Ini namanya tabayyun: memastikan kebenaran berita sebelum mempercayai atau membagikannya.",
      },
      {
        text: "Membalas \"Hoaks!\" tanpa mengecek apa pun.",
        best: false,
        feedback: "Menuduh tanpa memeriksa juga belum tabayyun. Bisa jadi kabarnya benar.",
      },
    ],
    source: "QS. Al-Hujurat 49:6 memerintahkan memeriksa kebenaran berita sebelum bertindak.",
  },
  {
    id: "tolong-ibu",
    situation: "Kamu sedang asyik bermain game ketika ibu memanggil minta tolong mengangkat jemuran.",
    options: [
      {
        text: "Menjawab \"sebentar\", lalu lanjut bermain sampai lupa.",
        best: false,
        feedback: "Menunda terus membuat ibu menunggu dan bisa membuatnya kecewa.",
      },
      {
        text: "Menyimpan permainan, lalu segera membantu.",
        best: true,
        feedback: "Berbakti kepada orang tua termasuk amal yang sangat dicintai Allah.",
      },
      {
        text: "Membantu sambil menggerutu.",
        best: false,
        feedback: "Membantu itu baik, tapi Al-Qur'an melarang berkata \"ah\" kepada orang tua. Bantulah dengan ikhlas.",
      },
    ],
    source: "QS. Al-Isra 17:23 memerintahkan berbuat baik kepada orang tua dan melarang berkata kasar kepada mereka.",
  },
  {
    id: "dompet-masjid",
    situation: "Selepas sholat Jumat, kamu menemukan dompet berisi uang di teras masjid.",
    options: [
      {
        text: "Mengambil sedikit uangnya karena tidak ada yang melihat.",
        best: false,
        feedback: "Allah selalu melihat. Mengambil hak orang lain tetap dosa walau sedikit.",
      },
      {
        text: "Menyerahkannya ke pengurus masjid agar diumumkan.",
        best: true,
        feedback: "Kamu menjaga amanah dan membantu pemiliknya mendapatkan kembali dompetnya.",
      },
      {
        text: "Membiarkannya di tempat semula.",
        best: false,
        feedback: "Tidak mengambilnya sudah baik, tapi dompet itu bisa diambil orang lain. Lebih baik diserahkan ke pengurus.",
      },
    ],
    source: "QS. An-Nisa 4:58 memerintahkan menyampaikan amanah kepada yang berhak.",
  },
  {
    id: "konten-beranda",
    situation: "Saat membuka media sosial, muncul video yang tidak pantas ditonton.",
    options: [
      {
        text: "Menonton sampai habis karena penasaran.",
        best: false,
        feedback: "Rasa penasaran itu wajar, tapi yang kita tonton ikut membentuk hati dan pikiran.",
      },
      {
        text: "Melewatinya dan menandai \"tidak tertarik\" supaya tidak muncul lagi.",
        best: true,
        feedback: "Kamu menjaga pandangan dan sekaligus membersihkan berandamu.",
      },
      {
        text: "Membagikannya ke teman untuk dibahas.",
        best: false,
        feedback: "Membagikannya berarti membuat orang lain ikut melihat hal yang tidak pantas.",
      },
    ],
    source: "QS. An-Nur 24:30 memerintahkan orang beriman menjaga pandangannya.",
  },
  {
    id: "teman-baru",
    situation: "Ada murid baru di kelasmu. Saat istirahat, dia duduk sendirian.",
    options: [
      {
        text: "Membiarkannya. Nanti juga dia punya teman.",
        best: false,
        feedback: "Hari-hari pertama di tempat baru sering terasa berat. Sapaan kecil bisa sangat berarti.",
      },
      {
        text: "Mengajaknya duduk bersama dan berkenalan.",
        best: true,
        feedback: "Senyum dan sapaanmu membuatnya merasa diterima.",
      },
      {
        text: "Menertawakannya bersama teman karena dia pendiam.",
        best: false,
        feedback: "Mengolok-olok orang lain dilarang. Bisa jadi dia lebih baik dari yang mengolok.",
      },
    ],
    source: "Rasulullah ﷺ bersabda: \"Senyummu di hadapan saudaramu adalah sedekah.\" (HR. Tirmidzi)",
  },
];
