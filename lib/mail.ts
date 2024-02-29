import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = "http://localhost:3000/reset-password?token=" + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const comfirmLink =
    "http://localhost:3000/verification-account?token=" + token;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${comfirmLink}">here</a> to confirm your email</p>`,
  });
}
