"use client";

import { useRouter } from "next/navigation";

interface SigninButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function SigninButton({
  children,
  mode = "redirect",
  asChild,
}: SigninButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push("/signin");
  };
  if (mode === "modal") {
    return <span></span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
