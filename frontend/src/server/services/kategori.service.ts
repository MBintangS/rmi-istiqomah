import type { FilterQuery } from "mongoose";
import { AppError } from "@/server/errors";
import { Artikel, Galeri, Kategori, Kegiatan, type IKategori } from "@/server/models";
import type {
  CreateKategoriInput,
  KategoriListQuery,
  UpdateKategoriInput,
} from "@/server/schemas/artikel.schema";
import { generateUniqueSlug, slugify } from "@/server/utils/slug";

function formatKategori(kategori: {
  _id: { toString(): string };
  name: string;
  slug: string;
  type: string;
  createdAt?: Date;
}) {
  return {
    id: kategori._id.toString(),
    name: kategori.name,
    slug: kategori.slug,
    type: kategori.type,
    createdAt: kategori.createdAt,
  };
}

export async function listKategori(query: KategoriListQuery) {
  const filter: FilterQuery<IKategori> = {};
  if (query.type) {
    filter.type = query.type;
  }
  const items = await Kategori.find(filter).sort({ name: 1 });
  return items.map(formatKategori);
}

export async function createKategori(data: CreateKategoriInput) {
  const baseSlug = data.slug ? slugify(data.slug) : slugify(data.name);
  if (!baseSlug) {
    throw new AppError(400, "VALIDATION_ERROR", "Slug kategori tidak valid");
  }

  const slug = await generateUniqueSlug(baseSlug, async (candidate) => {
    const existing = await Kategori.findOne({ slug: candidate }).select("_id");
    return Boolean(existing);
  });

  const kategori = await Kategori.create({ name: data.name, slug, type: data.type });
  return formatKategori(kategori);
}

export async function updateKategori(id: string, data: UpdateKategoriInput) {
  const kategori = await Kategori.findById(id);
  if (!kategori) {
    throw new AppError(404, "NOT_FOUND", "Kategori tidak ditemukan");
  }

  if (data.name !== undefined) kategori.name = data.name;
  if (data.type !== undefined) kategori.type = data.type;
  if (data.slug !== undefined) {
    const baseSlug = slugify(data.slug);
    if (!baseSlug) {
      throw new AppError(400, "VALIDATION_ERROR", "Slug kategori tidak valid");
    }
    kategori.slug = await generateUniqueSlug(baseSlug, async (candidate) => {
      const existing = await Kategori.findOne({
        slug: candidate,
        _id: { $ne: kategori._id },
      }).select("_id");
      return Boolean(existing);
    });
  }

  await kategori.save();
  return formatKategori(kategori);
}

export async function deleteKategori(id: string) {
  const kategori = await Kategori.findById(id);
  if (!kategori) {
    throw new AppError(404, "NOT_FOUND", "Kategori tidak ditemukan");
  }

  const [artikelCount, kegiatanCount, galeriCount] = await Promise.all([
    Artikel.countDocuments({ category: kategori._id }),
    Kegiatan.countDocuments({ category: kategori._id }),
    Galeri.countDocuments({ category: kategori._id }),
  ]);

  const totalUsage = artikelCount + kegiatanCount + galeriCount;
  if (totalUsage > 0) {
    throw new AppError(
      400,
      "VALIDATION_ERROR",
      `Kategori masih dipakai oleh ${totalUsage} konten. Pindahkan konten ke kategori lain sebelum menghapus.`,
    );
  }

  await kategori.deleteOne();
  return { id: kategori._id.toString() };
}
