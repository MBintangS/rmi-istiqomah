import { Router } from "express";
import {
  createDokumen,
  deleteDokumen,
  listDokumen,
  updateDokumen,
} from "../controllers/dokumen.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  createDokumenSchema,
  dokumenListQuerySchema,
  updateDokumenSchema,
} from "../schemas/misc.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, validateQuery(dokumenListQuerySchema), asyncHandler(listDokumen));
router.post("/", authenticate, requireAdmin, validateBody(createDokumenSchema), asyncHandler(createDokumen));
router.put("/:id", authenticate, requireAdmin, validateBody(updateDokumenSchema), asyncHandler(updateDokumen));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteDokumen));

export default router;
