import { Router } from "express";
import {
  createKategori,
  deleteKategori,
  listKategori,
  updateKategori,
} from "../controllers/kategori.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  createKategoriSchema,
  updateKategoriSchema,
  kategoriListQuerySchema,
} from "../schemas/artikel.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", validateQuery(kategoriListQuerySchema), asyncHandler(listKategori));
router.post("/", authenticate, requireAdmin, validateBody(createKategoriSchema), asyncHandler(createKategori));
router.put("/:id", authenticate, requireAdmin, validateBody(updateKategoriSchema), asyncHandler(updateKategori));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteKategori));

export default router;
