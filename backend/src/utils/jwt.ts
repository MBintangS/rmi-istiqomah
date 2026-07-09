import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "../middleware/errorHandler";
import type { UserRole } from "../models/User.model";

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError(500, "CONFIG_ERROR", "JWT_SECRET belum dikonfigurasi");
  }

  return secret;
}

export function signToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, getJwtSecret(), options);
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch {
    throw new AppError(401, "UNAUTHORIZED", "Token tidak valid atau sudah kedaluwarsa");
  }
}
