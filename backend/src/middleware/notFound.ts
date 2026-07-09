import type { Request, Response } from "express";
import { sendError } from "../utils/response";

export function notFoundHandler(_req: Request, res: Response): void {
  sendError(res, 404, "NOT_FOUND", "Endpoint tidak ditemukan");
}
