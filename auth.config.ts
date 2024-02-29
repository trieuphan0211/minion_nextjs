import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/scripts/schema";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
// import Azure from "next-auth/providers/azure-ad";

export default {
  providers: [
    // Azure({
    //   clientId: process.env.AZURE_CLIENT_ID,
    //   clientSecret: process.env.AZURE_CLIENT_SECRET,
    //   tenantId: process.env.AZURE_TENANT_ID,
    // }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
