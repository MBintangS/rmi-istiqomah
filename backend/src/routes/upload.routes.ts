import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { imageUpload } from "../middleware/upload";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  authenticate,
  requireAdmin,
  imageUpload.single("file"),
  asyncHandler(uploadImage),
);

export default router;
