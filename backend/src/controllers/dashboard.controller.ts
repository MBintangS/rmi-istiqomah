import type { Request, Response } from "express";
import {
  Artikel,
  ContactMessage,
  Dokumen,
  Galeri,
  Kegiatan,
  Pengurus,
  Program,
} from "../models";
import { sendSuccess } from "../utils/response";

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
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

  sendSuccess(res, {
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
  });
}
