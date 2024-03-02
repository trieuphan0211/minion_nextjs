import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email({})),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)), // for changing password
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required to change password",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (!data.newPassword && data.password) {
        return false;
      }
      return true;
    },
    {
      message: "NewPassword is required",
      path: ["newPassword"],
    }
  );
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6),
  code: z.optional(z.string()),
});

export const ForgotSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters long",
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  username: z.string().min(1, {
    message: "Username must be at least 1 characters long",
  }),
});
