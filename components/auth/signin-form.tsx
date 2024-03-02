"use client";

import { signin } from "@/actions/signin";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/scripts/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another account"
      : undefined;
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signin(value, callBackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          setError("An error occurred!");
        });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="signin_form w-full grid grid-cols-2 my-3 p-3 border-2 rounded-xl bg-slate-200"
      >
        <div className="space-y-4 col-span-2 mb-6">
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      className="px-3 py-2 border-2  border-slate-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="123456"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          )}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">
                      Username or email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        className="px-3 py-2 border-2  border-slate-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="trieuphan0211@gmail.com"
                        type="email"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        className="text-end text-blue-600 hover:text-blue-700"
                        href="/forgot-password"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        className="px-3 py-2 border-2  border-slate-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="******"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <div className="space-y-4 col-span-2">
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
        </div>
        <Button disabled={isPending} type="submit" className="mt-4 col-span-2">
          {showTwoFactor ? "Verify" : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
