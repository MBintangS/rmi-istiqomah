import { Router } from "express";
import {
  createKegiatan,
  deleteKegiatan,
  getKegiatanBySlug,
  listKegiatan,
  updateKegiatan,
} from "../controllers/kegiatan.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  createKegiatanSchema,
  kegiatanListQuerySchema,
  updateKegiatanSchema,
} from "../schemas/kegiatan.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, validateQuery(kegiatanListQuerySchema), asyncHandler(listKegiatan));
router.get("/:slug", optionalAuthenticate, asyncHandler(getKegiatanBySlug));
router.post("/", authenticate, requireAdmin, validateBody(createKegiatanSchema), asyncHandler(createKegiatan));
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validateBody(updateKegiatanSchema),
  asyncHandler(updateKegiatan),
);
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteKegiatan));

export default router;
