"use server";

import * as z from "zod";
import { LoginSchema } from "@/scripts/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorToken } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorComfirmationByUserId } from "@/data/two-factor-comfirmation";

export const signin = async (
  values: z.infer<typeof LoginSchema>,
  callBackUrl: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password, code } = validateFields.data;

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
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid two factor token!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid two factor token!" };
      }
      const hasExpierd = new Date() > new Date(twoFactorToken.expires);
      if (hasExpierd) {
        return { error: "Two factor token has expired!" };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
      const existingFactorComfirmation = await getTwoFactorComfirmationByUserId(
        existingUser.id
      );
      if (existingFactorComfirmation) {
        await db.twoFactorComfirmation.delete({
          where: { id: existingFactorComfirmation.id },
        });
      }
      await db.twoFactorComfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
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
