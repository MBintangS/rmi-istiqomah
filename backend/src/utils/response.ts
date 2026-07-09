import type { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  pagination?: PaginationMeta;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  options?: { status?: number; message?: string; pagination?: PaginationMeta },
): Response {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
  };

  if (options?.message) {
    body.message = options.message;
  }

  if (options?.pagination) {
    body.pagination = options.pagination;
  }

  return res.status(options?.status ?? 200).json(body);
}

export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): Response {
  const body: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };

  return res.status(status).json(body);
}
