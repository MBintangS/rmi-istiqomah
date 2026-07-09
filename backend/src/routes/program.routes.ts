import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getProgramBySlug,
  listProgram,
  updateProgram,
} from "../controllers/program.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createProgramSchema, updateProgramSchema } from "../schemas/organisasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listProgram));
router.get("/:slug", optionalAuthenticate, asyncHandler(getProgramBySlug));
router.post("/", authenticate, requireAdmin, validateBody(createProgramSchema), asyncHandler(createProgram));
router.put("/:id", authenticate, requireAdmin, validateBody(updateProgramSchema), asyncHandler(updateProgram));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteProgram));

export default router;
