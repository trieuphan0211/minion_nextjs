"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { SignupSchema } from "@/scripts/schema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password, username } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists!" };
  }
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: username,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Comfimation email sent!" };
};
