import { db } from "@/lib/db";

export const getAccountbyId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch {
    return null;
  }
};
