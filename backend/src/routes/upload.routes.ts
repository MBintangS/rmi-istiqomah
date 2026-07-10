import { Router } from "express";
import { uploadFile, uploadImage } from "../controllers/upload.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { documentUpload, imageUpload } from "../middleware/upload";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/",
  authenticate,
  requireAdmin,
  imageUpload.single("file"),
  asyncHandler(uploadImage),
);

router.post(
  "/file",
  authenticate,
  requireAdmin,
  documentUpload.single("file"),
  asyncHandler(uploadFile),
);

export default router;
