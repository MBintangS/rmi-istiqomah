import { Router } from "express";
import {
  createDonasi,
  deleteDonasi,
  getDonasiById,
  listDonasi,
  updateDonasi,
} from "../controllers/donasi.controller";
import { authenticate, optionalAuthenticate, requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createDonasiSchema, updateDonasiSchema } from "../schemas/donasi.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listDonasi));
router.get("/:id", optionalAuthenticate, asyncHandler(getDonasiById));
router.post("/", authenticate, requireAdmin, validateBody(createDonasiSchema), asyncHandler(createDonasi));
router.put("/:id", authenticate, requireAdmin, validateBody(updateDonasiSchema), asyncHandler(updateDonasi));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteDonasi));

export default router;
