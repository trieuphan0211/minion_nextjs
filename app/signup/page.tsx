"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { LuMoveRight } from "react-icons/lu";
import Typewriter from "typewriter-effect";

export default function Signup() {
  const [showElement, setShowElement] = useState({
    showForm: false,
  });
  return (
    <div className="signup bg-[#040d21] h-screen">
      <div className="signup_header z-10 relative flex items-center justify-between  h-16 py-3 mx-24 bg-transparent">
        <Link className="signup_header-logo h-full text-white " href="/">
          <img className=" h-full text-white " src="/logo_white.png" alt="" />
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
        <form
          className="signup_form w-[600px] m-6 p-6 rounded-lg text-gray-500 bg-gray-800 text-base font-medium border-gray-700 border-[1px]"
          //   onSubmit={handleSubmit(registerUser)}
        >
          <h1 className="sr-only">
            {"Welcome to Minion! Let's begin the adventure"}
          </h1>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome to Minion!<br/> Let's begin the adventure")
                .changeDelay(1)
                .callFunction(() => {
                  setShowElement({ ...showElement, showForm: true });
                })
                .start();
            }}
          />
          <div
            id="register"
            className={`${
              showElement.showForm ? "" : "hidden"
            } mt-6 flex flex-col register`}
          >
            <div>
              <label
                htmlFor="register_username"
                className="text-yellow-400 font-medium"
              >
                Enter your username*
              </label>
              <div className="mt-3 flex items-center gap-3">
                <LuMoveRight className="text-sky-500" />
                <input
                  id="register_username"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg text-gray-500 bg-gray-800 border-gray-800 text-base font-medium  hover:border-gray-700 focus-visible:outline-none border-[1px]"
                  //   {...register("username", {
                  //     required: "Please enter username",
                  //   })}
                />
                {/* <div className="border-gray-500 border-[1px] rounded-md px-4 py-2">
                    Continue
                  </div> */}
              </div>
            </div>
            <div>
              <label
                htmlFor="register_email"
                className="text-yellow-400 font-medium"
              >
                Enter your email*
              </label>
              <div className="mt-3 flex items-center gap-3">
                <LuMoveRight className="text-sky-500" />
                <input
                  id="register_email"
                  className="w-full px-4 py-2 rounded-lg text-gray-500 bg-gray-800 border-gray-800 text-base font-medium  hover:border-gray-700 focus-visible:border-gray-700 focus-visible:outline-none border-[1px]"
                  //   {...register("email", {
                  //     required: "Please enter email",
                  //     minLength: 15,
                  //   })}
                />
                {/* <div className="border-gray-500 border-[1px] rounded-md px-4 py-2">
                    Continue
                  </div> */}
              </div>
            </div>
            <div>
              <label
                htmlFor="register_passwd"
                className="text-yellow-400 font-medium"
              >
                Create a password*
              </label>
              <div className="mt-3 flex items-center gap-3">
                <LuMoveRight className="text-sky-500" />
                <input
                  id="register_passwd"
                  type="password"
                  className="w-full px-4 py-2 rounded-lg text-gray-500 bg-gray-800 border-gray-800 text-base font-medium  hover:border-gray-700 focus-visible:outline-none border-[1px]"
                  //   {...register("password", {
                  //     required: "Please enter password",
                  //   })}
                />
                {/* <div className="border-gray-500 border-[1px] rounded-md px-4 py-2">
                    Continue
                  </div> */}
              </div>
            </div>
            <div>
              <label
                htmlFor="register_comfirmpasswd"
                className="text-yellow-400 font-medium"
              >
                Create a comfirm password*
              </label>
              <div className="mt-3 flex items-center gap-3">
                <LuMoveRight className="text-sky-500" />
                <input
                  id="register_comfirmpasswd"
                  type="password"
                  className="w-full px-4 py-2 rounded-lg text-gray-500 bg-gray-800 border-gray-800 text-base font-medium  hover:border-gray-700 focus-visible:outline-none border-[1px]"
                  // {...register("comfirmpassword", {
                  //   required: "Please enter comfirm password",
                  //   pattern: register.password,
                  // })}
                />
                {/* <div className="border-gray-500 border-[1px] rounded-md px-4 py-2">
                    Continue
                  </div> */}
              </div>
            </div>
            <button className="btn mt-5 bg-gray-800 border-gray-500 hover:bg-gray-700 text-gray-500 uppercase text-xl tracking-widest">
              Sign Up
            </button>
          </div>
        </form>
        {/* {error && (
            <div className="signup_form w-[600px]  p-6 rounded-lg text-gray-500 bg-gray-800 text-base font-medium border-gray-700 border-[1px]">
              {error}
            </div>
          )} */}
      </div>
    </div>
  );
}
