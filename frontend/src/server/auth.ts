import "server-only";
import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "@/server/errors";
import { getServerEnv } from "@/server/env";
import type { UserRole } from "@/server/models/User.model";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export function signToken(payload: JwtPayload): string {
  const { jwtSecret, jwtExpiresIn } = getServerEnv();
  const options: SignOptions = {
    expiresIn: jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, jwtSecret, options);
}

export function verifyToken(token: string): JwtPayload {
  try {
    const { jwtSecret } = getServerEnv();
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch {
    throw new AppError(401, "UNAUTHORIZED", "Token tidak valid atau sudah kedaluwarsa");
  }
}

function readBearer(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7);
}

export function authenticate(request: Request): AuthUser {
  const token = readBearer(request);
  if (!token) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const payload = verifyToken(token);
  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}

export function optionalAuthenticate(request: Request): AuthUser | undefined {
  const token = readBearer(request);
  if (!token) {
    return undefined;
  }

  try {
    const payload = verifyToken(token);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return undefined;
  }
}

export function requireAdmin(user?: AuthUser): AuthUser {
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  if (user.role !== "admin" && user.role !== "superadmin") {
    throw new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini");
  }

  return user;
}

export function requireSuperAdmin(user?: AuthUser): AuthUser {
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  if (user.role !== "superadmin") {
    throw new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini");
  }

  return user;
}
