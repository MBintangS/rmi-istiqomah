import type { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";
import type { UserRole } from "../models/User.model";
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
    role: payload.role,
  };

  next();
}

function requireRoles(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "UNAUTHORIZED", "Token autentikasi diperlukan"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError(403, "FORBIDDEN", "Anda tidak memiliki akses ke resource ini"));
      return;
    }

    next();
  };
}

export const requireAdmin = requireRoles("admin", "superadmin");
export const requireSuperAdmin = requireRoles("superadmin");
