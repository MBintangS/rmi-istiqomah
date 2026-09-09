import { Artikel, ContactMessage, Dokumen, Galeri, Kegiatan, Pengurus, Program } from "@/server/models";

async function countPublishedGaleriImages(): Promise<number> {
  const result = await Galeri.aggregate<{ total: number }>([
    { $match: { isPublished: true } },
    { $project: { imageCount: { $size: { $ifNull: ["$images", []] } } } },
    { $group: { _id: null, total: { $sum: "$imageCount" } } },
  ]);
  return result[0]?.total ?? 0;
}

export async function getPublicCounts() {
  const [totalArtikel, totalKegiatan, totalGaleri] = await Promise.all([
    Artikel.countDocuments({ status: "published" }),
    Kegiatan.countDocuments({ isPublished: true }),
    countPublishedGaleriImages(),
  ]);
  return { totalArtikel, totalKegiatan, totalGaleri };
}

export async function getDashboardStats() {
  const [
    totalArtikel,
    publishedArtikel,
    draftArtikel,
    totalKegiatan,
    publishedKegiatan,
    totalGaleri,
    totalPengurus,
    totalProgram,
    totalDokumen,
    totalMessages,
  ] = await Promise.all([
    Artikel.countDocuments(),
    Artikel.countDocuments({ status: "published" }),
    Artikel.countDocuments({ status: "draft" }),
    Kegiatan.countDocuments(),
    Kegiatan.countDocuments({ isPublished: true }),
    Galeri.countDocuments({ isPublished: true }),
    Pengurus.countDocuments({ isActive: true }),
    Program.countDocuments({ isActive: true }),
    Dokumen.countDocuments({ isPublished: true }),
    ContactMessage.countDocuments(),
  ]);

  return {
    totalArtikel,
    publishedArtikel,
    draftArtikel,
    totalKegiatan,
    publishedKegiatan,
    totalGaleri,
    totalPengurus,
    totalProgram,
    totalDokumen,
    totalMessages,
  };
}
