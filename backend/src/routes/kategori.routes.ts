import { Router } from "express";
import { createKategori, listKategori } from "../controllers/kategori.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import { createKategoriSchema, kategoriListQuerySchema } from "../schemas/artikel.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", validateQuery(kategoriListQuerySchema), asyncHandler(listKategori));
router.post("/", authenticate, requireAdmin, validateBody(createKategoriSchema), asyncHandler(createKategori));

export default router;
