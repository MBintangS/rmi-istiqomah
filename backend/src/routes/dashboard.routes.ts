import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/stats", authenticate, requireAdmin, asyncHandler(getDashboardStats));

export default router;
