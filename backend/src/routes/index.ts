import { Router } from "express";
import artikelRoutes from "./artikel.routes";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import kategoriRoutes from "./kategori.routes";

const router = Router();

router.use(healthRoutes);
router.use("/auth", authRoutes);
router.use("/artikel", artikelRoutes);
router.use("/kategori", kategoriRoutes);

export default router;
