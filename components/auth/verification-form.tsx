"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { verificationAccount } from "@/actions/verification-account";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    verificationAccount(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        setError("An error occurred!");
      });
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, [token]);
  return (
    <div>
      <div>
        {!success && !error && <p>Verifying...</p>}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
      <Link href={"/signin"}>
        <Button>Back to Signin</Button>
      </Link>
    </div>
  );
};
