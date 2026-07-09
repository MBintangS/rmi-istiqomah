import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
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

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [field, error.message]),
    );
    sendError(res, 400, "VALIDATION_ERROR", "Data tidak valid", details);
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    sendError(res, 400, "VALIDATION_ERROR", "ID tidak valid");
    return;
  }

  if ("code" in err && err.code === 11000) {
    sendError(res, 409, "DUPLICATE_ERROR", "Data sudah ada");
    return;
  }

  console.error(err);
  sendError(res, 500, "INTERNAL_SERVER_ERROR", "Terjadi kesalahan pada server");
}
