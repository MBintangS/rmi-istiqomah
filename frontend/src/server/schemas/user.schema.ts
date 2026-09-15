import { z } from "zod";
import type { UserRole } from "@/lib/roles";

const storedRoleSchema = z.enum(["anggota", "pengurus", "superadmin", "admin"]);

export const userRoleSchema = storedRoleSchema.transform((role): UserRole => {
  if (role === "superadmin") return "superadmin";
  if (role === "anggota") return "anggota";
  return "pengurus";
});

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().trim().email("Email tidak valid"),
  role: userRoleSchema,
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").optional(),
  email: z.string().trim().email("Email tidak valid").optional(),
  role: userRoleSchema.optional(),
  isActive: z.boolean().optional(),
});

export const activateInvitationSchema = z
  .object({
    token: z.string().trim().min(1, "Token aktivasi wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
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
export type ActivateInvitationInput = z.infer<typeof activateInvitationSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
