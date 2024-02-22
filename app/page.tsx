"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="text-yellow-400 text-9xl font-bold italic m-auto w-full flex flex-col items-center text-center">
      <h1>WELCOME TO MINION</h1>
      <div className="flex gap-5">
        <Link href="/signin">
          <button className="btn px-10 hover:bg-yellow-300 hover:border-yellow-300">
            Signin
          </button>
        </Link>
        <Link href="/signup">
          <button className="btn px-10 hover:bg-yellow-300 hover:border-yellow-300">
            Signup
          </button>
        </Link>
      </div>
    </main>
  );
}
