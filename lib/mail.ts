import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/reset-password?token=` + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const comfirmLink = `${domain}/verification-account?token=` + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${comfirmLink}">here</a> to confirm your email</p>`,
  });
}

export const sendTwoFactorToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your two factor token",
    html: `<p>Your two factor token is: ${token}</p>`,
  });
};
