import { Router } from "express";
import { createBanner, deleteBanner, listBanner, updateBanner } from "../controllers/banner.controller";
import { authenticate, optionalAuthenticate, requirePengurus } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { createBannerSchema, updateBannerSchema } from "../schemas/galeri.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", optionalAuthenticate, asyncHandler(listBanner));
router.post("/", authenticate, requirePengurus, validateBody(createBannerSchema), asyncHandler(createBanner));
router.put("/:id", authenticate, requirePengurus, validateBody(updateBannerSchema), asyncHandler(updateBanner));
router.delete("/:id", authenticate, requirePengurus, asyncHandler(deleteBanner));

export default router;
