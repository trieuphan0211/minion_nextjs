import SigninForm from "@/components/auth/signin-form";
import { Social } from "@/components/auth/social";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Signin() {
  return (
    <div className="signin grid grid-cols-1 p-8 text-sm font-mono">
      <div className="flex flex-col items-center w-80 m-auto">
        <Link href={"/"}>
          <Image src="/logo.png" width={48} height={48} alt="Logo" />
        </Link>
        <h1 className="text-2xl py-4">Sign in to Minion</h1>
        <Suspense>
          <SigninForm />
        </Suspense>
        <Social />
        <nav className="w-full grid gap-2 my-3 p-3 border-2 rounded-xl bg-slate-200">
          <Link
            href=""
            className="text-center font-semibold text-blue-600 hover:underline hover:text-blue-700"
          >
            Sign in with a passkey
          </Link>
          <p className="text-center">
            New to Minion?{" "}
            <Link
              href="/signup"
              className=" text-blue-600 hover:underline hover:text-blue-700"
            >
              Create an account
            </Link>
          </p>
        </nav>
      </div>
    </div>
  );
}
