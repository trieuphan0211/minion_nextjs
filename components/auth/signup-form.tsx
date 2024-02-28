"use client";

import { signup } from "@/actions/signup";
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
import { SignupSchema } from "@/scripts/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = (value: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(value).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[600px] m-6 p-6 rounded-lg text-gray-500 bg-gray-800 text-base font-medium border-gray-700 border-[1px]"
      >
        <div className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    className="px-3 py-2 border-2  border-slate-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="trieuphan0211"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
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
        </div>
        <div className="space-y-4 ">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="mt-4 col-span-2 w-full"
        >
          Create an account
        </Button>
      </form>
    </Form>
  );
}
