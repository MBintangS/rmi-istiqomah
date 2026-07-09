import { Router } from "express";
import {
  createArtikel,
  deleteArtikel,
  getArtikelBySlug,
  listArtikel,
  updateArtikel,
} from "../controllers/artikel.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  artikelListQuerySchema,
  createArtikelSchema,
  updateArtikelSchema,
} from "../schemas/artikel.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, validateQuery(artikelListQuerySchema), asyncHandler(listArtikel));
router.get("/:slug", optionalAuthenticate, asyncHandler(getArtikelBySlug));
router.post("/", authenticate, requireAdmin, validateBody(createArtikelSchema), asyncHandler(createArtikel));
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validateBody(updateArtikelSchema),
  asyncHandler(updateArtikel),
);
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteArtikel));

export default router;
