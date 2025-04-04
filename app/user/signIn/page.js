"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  passwd: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      passwd: "",
    },
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ Added correct headers
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      console.log("Login success", result.data);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          SignIn
        </Button>
      </form>
    </Form>
  );
}

export function SignIn() {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm border px-4 py-8 rounded-md shadow-lg">
          <h1 className="mb-4 text-3xl text-center font-extrabold">Log In</h1>
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/user/signUp" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
