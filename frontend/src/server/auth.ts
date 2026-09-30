import "server-only";
import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "@/server/errors";
import { getServerEnv } from "@/server/env";
import { User, type UserRole } from "@/server/models/User.model";
import {
  isCmsRole,
  isPengurusRole,
  isSuperAdminRole,
  normalizeRole,
} from "@/lib/roles";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
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

async function assertSessionCurrent(payload: JwtPayload) {
  const user = await User.findById(payload.sub).select("isActive passwordChangedAt");
  if (!user || !user.isActive) {
    throw new AppError(401, "UNAUTHORIZED", "Token tidak valid atau sudah kedaluwarsa");
  }

  if (
    user.passwordChangedAt &&
    typeof payload.iat === "number" &&
    payload.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)
  ) {
    throw new AppError(
      401,
      "UNAUTHORIZED",
      "Sesi berakhir karena password telah diubah. Silakan login kembali.",
    );
  }
}

function readBearer(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7);
}

export async function authenticate(request: Request): Promise<AuthUser> {
  const token = readBearer(request);
  if (!token) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  const payload = verifyToken(token);
  await assertSessionCurrent(payload);
  return {
    id: payload.sub,
    email: payload.email,
    role: normalizeRole(payload.role),
  };
}

export async function optionalAuthenticate(request: Request): Promise<AuthUser | undefined> {
  const token = readBearer(request);
  if (!token) {
    return undefined;
  }

  try {
    const payload = verifyToken(token);
    await assertSessionCurrent(payload);
    return {
      id: payload.sub,
      email: payload.email,
      role: normalizeRole(payload.role),
    };
  } catch {
    return undefined;
  }
}

export function requireAdmin(user?: AuthUser): AuthUser {
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  if (!isCmsRole(user.role)) {
    throw new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini");
  }

  return user;
}

export function requirePengurus(user?: AuthUser): AuthUser {
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  if (!isPengurusRole(user.role)) {
    throw new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini");
  }

  return user;
}

export function requireSuperAdmin(user?: AuthUser): AuthUser {
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan");
  }

  if (!isSuperAdminRole(user.role)) {
    throw new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini");
  }

  return user;
}
