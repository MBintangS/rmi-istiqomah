import { Router } from "express";
import {
  createPengurus,
  deletePengurus,
  listPengurus,
  updatePengurus,
} from "../controllers/pengurus.controller";
import { authenticate, optionalAuthenticate, requireSuperAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createPengurusSchema, updatePengurusSchema } from "../schemas/organisasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listPengurus));
router.post("/", authenticate, requireSuperAdmin, validateBody(createPengurusSchema), asyncHandler(createPengurus));
router.put("/:id", authenticate, requireSuperAdmin, validateBody(updatePengurusSchema), asyncHandler(updatePengurus));
router.delete("/:id", authenticate, requireSuperAdmin, asyncHandler(deletePengurus));

export default router;
