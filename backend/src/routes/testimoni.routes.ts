import { Router } from "express";
import {
  createTestimoni,
  deleteTestimoni,
  listTestimoni,
  updateTestimoni,
} from "../controllers/testimoni.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createTestimoniSchema, updateTestimoniSchema } from "../schemas/organisasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listTestimoni));
router.post("/", authenticate, requireAdmin, validateBody(createTestimoniSchema), asyncHandler(createTestimoni));
router.put("/:id", authenticate, requireAdmin, validateBody(updateTestimoniSchema), asyncHandler(updateTestimoni));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteTestimoni));

export default router;
