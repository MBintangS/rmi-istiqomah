import { z } from "zod";

export const userCreateFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: z.enum(["admin", "superadmin"]),
  isActive: z.boolean(),
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;

export const userEditFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().optional(),
  role: z.enum(["admin", "superadmin"]),
  isActive: z.boolean(),
}).superRefine((values, ctx) => {
  if (values.password && values.password.length > 0 && values.password.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password minimal 8 karakter",
      path: ["password"],
    });
  }
});

export type UserEditFormValues = z.infer<typeof userEditFormSchema>;
