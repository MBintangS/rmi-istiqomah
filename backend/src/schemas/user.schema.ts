import { z } from "zod";
import type { UserRole } from "../utils/roles";

const storedRoleSchema = z.enum(["pengurus", "superadmin", "admin"]);

export const userRoleSchema = storedRoleSchema.transform((role): UserRole =>
  role === "superadmin" ? "superadmin" : "pengurus",
);

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: userRoleSchema,
  isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").optional(),
  email: z.string().trim().email("Email tidak valid").optional(),
  password: z.string().min(8, "Password minimal 8 karakter").optional(),
  role: userRoleSchema.optional(),
  isActive: z.boolean().optional(),
});

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter"),
    email: z.string().trim().email("Email tidak valid"),
    avatar: z.string().trim().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.avatar && values.avatar.length > 0) {
      const parsed = z.string().url().safeParse(values.avatar);
      if (!parsed.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL foto tidak valid",
          path: ["avatar"],
        });
      }
    }

    if (values.newPassword) {
      if (values.newPassword.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password baru minimal 8 karakter",
          path: ["newPassword"],
        });
      }
      if (!values.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password saat ini wajib diisi",
          path: ["currentPassword"],
        });
      }
    }
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
