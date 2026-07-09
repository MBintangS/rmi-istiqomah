import { Router } from "express";
import {
  createGaleri,
  deleteGaleri,
  getGaleriById,
  listGaleri,
  updateGaleri,
} from "../controllers/galeri.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validate";
import {
  createGaleriSchema,
  galeriListQuerySchema,
  updateGaleriSchema,
} from "../schemas/galeri.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, validateQuery(galeriListQuerySchema), asyncHandler(listGaleri));
router.get("/:id", optionalAuthenticate, asyncHandler(getGaleriById));
router.post("/", authenticate, requireAdmin, validateBody(createGaleriSchema), asyncHandler(createGaleri));
router.put("/:id", authenticate, requireAdmin, validateBody(updateGaleriSchema), asyncHandler(updateGaleri));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteGaleri));

export default router;
