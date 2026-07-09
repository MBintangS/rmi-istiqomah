import { Router } from "express";
import agendaRoutes from "./agenda.routes";
import artikelRoutes from "./artikel.routes";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import kategoriRoutes from "./kategori.routes";
import kegiatanRoutes from "./kegiatan.routes";

const router = Router();

router.use(healthRoutes);
router.use("/auth", authRoutes);
router.use("/artikel", artikelRoutes);
router.use("/kategori", kategoriRoutes);
router.use("/kegiatan", kegiatanRoutes);
router.use("/agenda", agendaRoutes);

export default router;
