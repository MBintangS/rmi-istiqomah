import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  console.error(err);
  sendError(res, 500, "INTERNAL_SERVER_ERROR", "Terjadi kesalahan pada server");
}
