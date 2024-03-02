"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";
import Typewriter from "typewriter-effect";
import SignupForm from "@/components/auth/signup-form";
import Image from "next/image";

export default function Signup() {
  return (
    <div className="signup bg-[#040d21] h-screen">
      <div className="signup_header z-10 relative flex items-center justify-between  h-16 py-3 mx-24 bg-transparent">
        <Link className="signup_header-logo h-full text-white " href="/">
          <Image
            className=" h-full text-white "
            src="/logo_white.png"
            width={64}
            height={64}
            alt=""
          />
        </Link>
        <p className=" text-slate-400 text-md flex gap-3">
          Already have an account?
          <Link
            href="/signin"
            className=" group text-white flex items-center gap-1 hover:underline "
          >
            Sign in{" "}
            <FaArrowRight className="text-[12px] group-hover:translate-x-1 group-hover:underline transition-all" />
          </Link>
        </p>
      </div>
      <div className="signup_background z-0">
        <div className="signup_background-start"></div>
        <div className="signup_background-start"></div>
        <div className="signup_background-start"></div>
        <div className="signup_background-start"></div>
        <div className="signup_background-start"></div>
        <div className="signup_background-start"></div>
      </div>
      <div className="z-10 relative flex flex-col items-center justify-center pt-20">
        <SignupForm />
      </div>
    </div>
  );
}
