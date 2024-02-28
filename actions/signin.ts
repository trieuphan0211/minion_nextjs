"use server";

import * as z from "zod";
import { LoginSchema } from "@/scripts/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const signin = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(existingUser.email, verificationToken.token);
    return { success: "Comfirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }
    throw error;
  }
  // return { success: "Logged in!" };
};
