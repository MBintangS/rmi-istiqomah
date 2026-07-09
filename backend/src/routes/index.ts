import { Router } from "express";
import agendaRoutes from "./agenda.routes";
import artikelRoutes from "./artikel.routes";
import authRoutes from "./auth.routes";
import bannerRoutes from "./banner.routes";
import galeriRoutes from "./galeri.routes";
import healthRoutes from "./health.routes";
import kategoriRoutes from "./kategori.routes";
import kegiatanRoutes from "./kegiatan.routes";
import pengurusRoutes from "./pengurus.routes";
import programRoutes from "./program.routes";
import testimoniRoutes from "./testimoni.routes";

const router = Router();

router.use(healthRoutes);
router.use("/auth", authRoutes);
router.use("/artikel", artikelRoutes);
router.use("/kategori", kategoriRoutes);
router.use("/kegiatan", kegiatanRoutes);
router.use("/agenda", agendaRoutes);
router.use("/galeri", galeriRoutes);
router.use("/banner", bannerRoutes);
router.use("/pengurus", pengurusRoutes);
router.use("/program", programRoutes);
router.use("/testimoni", testimoniRoutes);

export default router;
