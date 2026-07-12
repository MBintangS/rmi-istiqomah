import { Router } from "express";
import { getPublicCounts } from "../controllers/stats.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/count", asyncHandler(getPublicCounts));

export default router;
