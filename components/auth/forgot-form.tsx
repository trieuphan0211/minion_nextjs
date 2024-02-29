"use client";

import { forgot } from "@/actions/forgot";
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
import { ForgotSchema } from "@/scripts/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function ForgotForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (value: z.infer<typeof ForgotSchema>) => {
    setError("");
    setSuccess("");
    console.log("value", value);
    startTransition(() => {
      forgot(value).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Username or email address</FormLabel>
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
        </div>
        <div className="space-y-4 col-span-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button disabled={isPending} type="submit" className="mt-4 col-span-2">
          Reset Email Here
        </Button>
        <Link href={"/signin"} className="text-center mt-5 col-span-2">
          Back to Login
        </Link>
      </form>
    </Form>
  );
}
