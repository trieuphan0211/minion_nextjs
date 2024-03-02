import { db } from "@/lib/db";

export const getTwoFactorComfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorComfirmation = await db.twoFactorComfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorComfirmation;
  } catch {
    return;
  }
};
