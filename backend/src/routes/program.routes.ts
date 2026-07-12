import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getProgramBySlug,
  listProgram,
  updateProgram,
} from "../controllers/program.controller";
import { authenticate, optionalAuthenticate, requireSuperAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createProgramSchema, updateProgramSchema } from "../schemas/organisasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listProgram));
router.get("/:slug", optionalAuthenticate, asyncHandler(getProgramBySlug));
router.post("/", authenticate, requireSuperAdmin, validateBody(createProgramSchema), asyncHandler(createProgram));
router.put("/:id", authenticate, requireSuperAdmin, validateBody(updateProgramSchema), asyncHandler(updateProgram));
router.delete("/:id", authenticate, requireSuperAdmin, asyncHandler(deleteProgram));

export default router;
