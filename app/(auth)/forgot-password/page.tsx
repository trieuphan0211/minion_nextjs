import ForgotForm from "@/components/auth/forgot-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="signin grid grid-cols-1 p-8 text-sm font-mono">
      <div className="flex flex-col items-center w-80 m-auto">
        <Link href={"/"}>
          <Image src="/logo.png" width={48} height={48} alt="Logo" />
        </Link>
        <h1 className="text-2xl py-4">Forgot</h1>
        <ForgotForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
