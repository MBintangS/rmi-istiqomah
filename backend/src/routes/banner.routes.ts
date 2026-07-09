import { Router } from "express";
import { createBanner, deleteBanner, listBanner, updateBanner } from "../controllers/banner.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createBannerSchema, updateBannerSchema } from "../schemas/galeri.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(listBanner));
router.post("/", authenticate, requireAdmin, validateBody(createBannerSchema), asyncHandler(createBanner));
router.put("/:id", authenticate, requireAdmin, validateBody(updateBannerSchema), asyncHandler(updateBanner));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteBanner));

export default router;
