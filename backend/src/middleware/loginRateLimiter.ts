import rateLimit from "express-rate-limit";
import { sendError } from "../utils/response";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(
      res,
      429,
      "TOO_MANY_REQUESTS",
      "Terlalu banyak percobaan login. Coba lagi dalam 15 menit.",
    );
  },
});
