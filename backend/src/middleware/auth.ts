import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.model";
import { AppError } from "./errorHandler";
import {
  isCmsRole,
  isPengurusRole,
  isSuperAdminRole,
  normalizeRole,
} from "../utils/roles";
import { verifyToken } from "../utils/jwt";

async function resolveSession(token: string) {
  const payload = verifyToken(token);
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

  return {
    id: payload.sub,
    email: payload.email,
    role: normalizeRole(payload.role),
  };
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan"));
    return;
  }

  void resolveSession(authHeader.slice(7)).then(
    (user) => {
      req.user = user;
      next();
    },
    (error: unknown) => next(error),
  );
}

function requireRoles(check: (role: string) => boolean) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan"));
      return;
    }

    if (!check(req.user.role)) {
      next(new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini"));
      return;
    }

    next();
  };
}

export const requireAdmin = requireRoles(isCmsRole);
export const requirePengurus = requireRoles(isPengurusRole);
export const requireSuperAdmin = requireRoles(isSuperAdminRole);

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next();
    return;
  }

  void resolveSession(authHeader.slice(7)).then(
    (user) => {
      req.user = user;
      next();
    },
    (error: unknown) => {
      if (error instanceof AppError && error.statusCode === 401) {
        next();
        return;
      }
      next(error);
    },
  );
}
