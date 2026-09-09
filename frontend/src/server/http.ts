import "server-only";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";
import { connectDb } from "@/server/db";
import { AppError } from "@/server/errors";
import type { PaginationMeta } from "@/server/utils/pagination";

export function jsonSuccess<T>(
  data: T,
  options?: { status?: number; message?: string; pagination?: PaginationMeta },
) {
  const body: Record<string, unknown> = {
    success: true,
    data,
  };

  if (options?.message) {
    body.message = options.message;
  }

  if (options?.pagination) {
    body.pagination = options.pagination;
  }

  return NextResponse.json(body, { status: options?.status ?? 200 });
}

export function jsonError(
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined ? { details } : {}),
      },
    },
    { status },
  );
}

export function mapError(err: unknown) {
  if (err instanceof AppError) {
    return jsonError(err.statusCode, err.code, err.message, err.details);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [field, error.message]),
    );
    return jsonError(400, "VALIDATION_ERROR", "Data tidak valid", details);
  }

  if (err instanceof mongoose.Error.CastError) {
    return jsonError(400, "VALIDATION_ERROR", "ID tidak valid");
  }

  if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
    return jsonError(409, "DUPLICATE_ERROR", "Data sudah ada");
  }

  console.error(err);
  return jsonError(500, "INTERNAL_SERVER_ERROR", "Terjadi kesalahan pada server");
}

export async function apiHandler(handler: () => Promise<NextResponse>) {
  try {
    return await handler();
  } catch (error) {
    return mapError(error);
  }
}

export async function apiRoute(handler: () => Promise<NextResponse>) {
  return apiHandler(async () => {
    await connectDb();
    return handler();
  });
}

export function queryObject(request: Request): Record<string, unknown> {
  const { searchParams } = new URL(request.url);
  const query: Record<string, unknown> = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return query;
}

export function parseQuery<T>(request: Request, schema: ZodSchema<T>): T {
  const result = schema.safeParse(queryObject(request));

  if (!result.success) {
    throw new AppError(400, "VALIDATION_ERROR", "Query tidak valid", result.error.flatten().fieldErrors);
  }

  return result.data;
}

export async function parseBody<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  let raw: unknown = {};

  try {
    const text = await request.text();
    raw = text ? JSON.parse(text) : {};
  } catch {
    throw new AppError(400, "VALIDATION_ERROR", "Body JSON tidak valid");
  }

  const result = schema.safeParse(raw);

  if (!result.success) {
    throw new AppError(400, "VALIDATION_ERROR", "Data tidak valid", result.error.flatten().fieldErrors);
  }

  return result.data;
}
