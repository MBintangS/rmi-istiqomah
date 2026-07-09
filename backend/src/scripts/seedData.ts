import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "../config/database";
import {
  Artikel,
  Galeri,
  Kategori,
  Kegiatan,
  Pengurus,
  Program,
  Settings,
  User,
} from "../models";

const SETTINGS_KEY = "default";

const SEED_IMAGES = {
  hero: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  kajian: "https://res.cloudinary.com/demo/image/upload/docs/models.jpg",
  masjid: "https://res.cloudinary.com/demo/image/upload/docs/woman-on-a-football-field.jpg",
  program: "https://res.cloudinary.com/demo/image/upload/docs/pencils.jpg",
  galeri1: "https://res.cloudinary.com/demo/image/upload/docs/coffee.jpg",
  galeri2: "https://res.cloudinary.com/demo/image/upload/docs/kid-rocks.jpg",
  portrait: "https://res.cloudinary.com/demo/image/upload/docs/teapot.jpg",
} as const;

async function ensureAdminUser() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@rmi-masjid.org").toLowerCase();
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: process.env.SEED_ADMIN_NAME ?? "Super Admin RMI",
      email,
      password: process.env.SEED_ADMIN_PASSWORD ?? "AdminRMI123",
      role: "superadmin",
      isActive: true,
    });
    console.log(`Superadmin dibuat: ${email}`);
  }

  return user;
}

async function upsertKategori(name: string, slug: string, type: "artikel" | "kegiatan" | "galeri") {
  return Kategori.findOneAndUpdate(
    { slug },
    { name, slug, type },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

async function seedSettings(pengurusCount: number) {
  await Settings.findOneAndUpdate(
    { singletonKey: SETTINGS_KEY },
    {
      singletonKey: SETTINGS_KEY,
      siteName: "Remaja Masjid Istiqomah",
      tagline: "Generasi Qurani, Berakhlak Mulia",
      about:
        "RMI adalah wadah pembinaan remaja masjid yang aktif dalam kajian, kegiatan sosial, dan pengembangan karakter islami.",
      vision: "Menjadi generasi remaja masjid yang berilmu, berakhlak mulia, dan bermanfaat bagi umat.",
      mission: [
        "Menyelenggarakan kajian rutin dan rutinitas ibadah bersama",
        "Membina karakter dan kepemimpinan remaja masjid",
        "Menggerakkan kegiatan sosial dan dokumentasi dakwah",
      ],
      address: "Jl. Masjid Istiqomah No. 1, Jakarta",
      phone: "021-1234567",
      whatsapp: "6281234567890",
      email: "info@rmi-masjid.org",
      socialMedia: {
        instagram: "https://instagram.com/rmi.masjid",
        youtube: "https://youtube.com/@rmi",
      },
      googleMapsEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890",
      stats: {
        totalEvents: 5,
        totalMembers: 120,
        totalPengurus: pengurusCount,
        establishedYear: 2010,
      },
    },
    { upsert: true, new: true },
  );
  console.log("Settings di-seed");
}

async function seedArtikel(
  authorId: string,
  kategoriArtikelId: string,
) {
  const items = [
    {
      title: "Keutamaan Shalat Berjamaah",
      content:
        "<p>Shalat berjamaah memiliki keutamaan besar, yaitu pahala 27 kali lipat dibanding shalat sendirian.</p>",
      status: "published" as const,
    },
    {
      title: "Tips Menjaga Semangat Kajian",
      content: "<p>Konsistensi kecil setiap minggu lebih baik daripada motivasi besar yang cepat pudar.</p>",
      status: "published" as const,
    },
    {
      title: "Menjadi Pemuda yang Bermanfaat",
      content: "<p>Remaja muslim dituntut untuk memberi manfaat bagi lingkungan sekitar.</p>",
      status: "published" as const,
    },
    {
      title: "Adab Menuntut Ilmu",
      content: "<p>Menuntut ilmu wajib bagi setiap muslim dengan adab yang baik kepada guru dan ilmu.</p>",
      status: "published" as const,
    },
    {
      title: "Persiapan Ramadhan untuk Remaja",
      content: "<p>Mulai perbanyak ibadah ringan sebelum Ramadhan tiba agar momentum terjaga.</p>",
      status: "published" as const,
    },
  ];

  for (const [index, item] of items.entries()) {
    const existing = await Artikel.findOne({ title: item.title });
    if (existing) continue;

    await Artikel.create({
      ...item,
      category: kategoriArtikelId,
      thumbnail: index % 2 === 0 ? SEED_IMAGES.kajian : SEED_IMAGES.masjid,
      author: authorId,
      publishedAt: new Date(),
    });
  }

  console.log("Artikel di-seed");
}

async function seedKegiatan(kategoriKegiatanId: string) {
  const now = Date.now();
  const items = [
    {
      title: "Kajian Ahad Pagi",
      description: "Kajian rutin setiap Ahad pagi bersama ustadz masjid.",
      dateStart: new Date(now + 3 * 24 * 60 * 60 * 1000),
      location: "Masjid Istiqomah",
      status: "upcoming" as const,
    },
    {
      title: "Pengajian Remaja",
      description: "Sesi interaktif untuk remaja masjid dengan tema keislaman.",
      dateStart: new Date(now + 7 * 24 * 60 * 60 * 1000),
      location: "Aula Masjid",
      status: "upcoming" as const,
    },
    {
      title: "Bakti Sosial RMI",
      description: "Kegiatan sosial mengunjungi dan membantu masyarakat sekitar.",
      dateStart: new Date(now + 14 * 24 * 60 * 60 * 1000),
      location: "Lingkungan Sekitar Masjid",
      status: "upcoming" as const,
    },
    {
      title: "Study Tour Masjid Bersejarah",
      description: "Kunjungan edukatif ke masjid-masjid bersejarah.",
      dateStart: new Date(now + 21 * 24 * 60 * 60 * 1000),
      location: "Jakarta Pusat",
      status: "upcoming" as const,
    },
    {
      title: "Mabit Akhir Tahun",
      description: "Menginap di masjid dengan rangkaian ibadah malam.",
      dateStart: new Date(now + 30 * 24 * 60 * 60 * 1000),
      location: "Masjid Istiqomah",
      status: "upcoming" as const,
    },
  ];

  for (const [index, item] of items.entries()) {
    const existing = await Kegiatan.findOne({ title: item.title });
    if (existing) continue;

    await Kegiatan.create({
      ...item,
      category: kategoriKegiatanId,
      thumbnail: index % 2 === 0 ? SEED_IMAGES.hero : SEED_IMAGES.kajian,
      isPublished: true,
      time: "08:00 WIB",
    });
  }

  console.log("Kegiatan di-seed");
}

async function seedProgram() {
  const items = [
    {
      name: "Tahfidz Quran",
      description: "Program hafalan Al-Quran bertahap untuk remaja masjid.",
      content: "<p>Program tahfidz RMI dibimbing oleh pembina berpengalaman dengan target hafalan mingguan.</p>",
      icon: "book-open",
    },
    {
      name: "Kajian Rutin",
      description: "Kajian mingguan dengan tema keislaman kontemporer.",
      content: "<p>Kajian rutin diadakan setiap pekan dengan materi yang relevan untuk remaja.</p>",
      icon: "users",
    },
    {
      name: "Pramuka Masjid",
      description: "Pembinaan karakter dan kedisiplinan melalui kegiatan pramuka.",
      content: "<p>Kegiatan outbound dan latihan kepemimpinan untuk anggota RMI.</p>",
      icon: "flag",
    },
  ];

  for (const [index, item] of items.entries()) {
    const existing = await Program.findOne({ name: item.name });
    if (existing) continue;

    await Program.create({
      ...item,
      image: index === 0 ? SEED_IMAGES.program : SEED_IMAGES.kajian,
      isActive: true,
    });
  }

  console.log("Program di-seed");
}

async function seedPengurus() {
  const items = [
    { name: "Ahmad Fauzi", position: "Ketua", order: 1 },
    { name: "Muhammad Rizki", position: "Wakil Ketua", order: 2 },
    { name: "Fatimah Azzahra", position: "Sekretaris", order: 3 },
    { name: "Abdullah Rahman", position: "Bendahara", order: 4 },
    { name: "Siti Nurhaliza", position: "Koordinator Kajian", order: 5 },
    { name: "Yusuf Ibrahim", position: "Koordinator Humas", order: 6 },
  ];

  for (const item of items) {
    const existing = await Pengurus.findOne({ name: item.name, position: item.position });
    if (existing) continue;

    await Pengurus.create({
      ...item,
      period: "2024-2026",
      photo: SEED_IMAGES.portrait,
      isActive: true,
    });
  }

  console.log("Pengurus di-seed");
  return items.length;
}

async function seedGaleri(kategoriGaleriId: string) {
  const items = [
    {
      title: "Dokumentasi Kajian Ahad",
      images: [
        { url: SEED_IMAGES.galeri1, caption: "Sesi kajian" },
        { url: SEED_IMAGES.galeri2, caption: "Jamaah remaja" },
      ],
      order: 1,
    },
    {
      title: "Bakti Sosial RMI",
      images: [
        { url: SEED_IMAGES.hero, caption: "Distribusi sembako" },
        { url: SEED_IMAGES.masjid, caption: "Tim relawan" },
      ],
      order: 2,
    },
    {
      title: "Study Tour Remaja",
      images: [
        { url: SEED_IMAGES.kajian, caption: "Kunjungan masjid" },
        { url: SEED_IMAGES.program, caption: "Foto bersama" },
        { url: SEED_IMAGES.galeri1, caption: "Sesi refleksi" },
      ],
      order: 3,
    },
  ];

  for (const item of items) {
    const existing = await Galeri.findOne({ title: item.title });
    if (existing) continue;

    await Galeri.create({
      ...item,
      category: kategoriGaleriId,
      isPublished: true,
    });
  }

  console.log("Galeri di-seed");
}

async function seedData() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const force = process.env.SEED_FORCE === "true";

  await connectDatabase(mongoUri);

  const existingCount = await Artikel.countDocuments();

  if (existingCount >= 5 && !force) {
    console.log("Database sudah berisi data seed. Set SEED_FORCE=true untuk seed ulang.");
    await disconnectDatabase();
    return;
  }

  const admin = await ensureAdminUser();

  const [katArtikel, katKegiatan, katGaleri] = await Promise.all([
    upsertKategori("Kajian Islam", "kajian-islam", "artikel"),
    upsertKategori("Kegiatan Sosial", "kegiatan-sosial", "kegiatan"),
    upsertKategori("Dokumentasi", "dokumentasi", "galeri"),
  ]);

  const pengurusCount = await seedPengurus();
  await seedSettings(pengurusCount);
  await seedArtikel(admin._id.toString(), katArtikel!._id.toString());
  await seedKegiatan(katKegiatan!._id.toString());
  await seedProgram();
  await seedGaleri(katGaleri!._id.toString());

  console.log("Seed selesai.");
  await disconnectDatabase();
}

seedData()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error("Failed to seed data:", error);
    await disconnectDatabase().catch(() => undefined);
    process.exit(1);
  });
