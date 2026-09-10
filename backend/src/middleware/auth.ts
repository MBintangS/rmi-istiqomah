import type { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";
import { isCmsRole, isSuperAdminRole, normalizeRole } from "../utils/roles";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan"));
    return;
  }

  const token = authHeader.slice(7);
  const payload = verifyToken(token);

  req.user = {
    id: payload.sub,
    email: payload.email,
    role: normalizeRole(payload.role),
  };

  next();
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
export const requireSuperAdmin = requireRoles(isSuperAdminRole);

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next();
    return;
  }

  try {
    const token = authHeader.slice(7);
    const payload = verifyToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: normalizeRole(payload.role),
    };
  } catch {
    // Token tidak valid — perlakukan sebagai request publik
  }

  next();
}
