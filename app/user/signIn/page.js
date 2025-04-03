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
        <Button type="submit">SignIn</Button>
      </form>
    </Form>
  );
}

export function SignIn() {
  return (
    <>
      <main className="flex justify-center items-center pb-10 h-[90dvh] min-h-fit">
        <div className="py-12 bg-accent px-4 w-[80dvw] min-[650px]:w-[45dvw] rounded-lg">
          <h1 className="mb-4 text-3xl text-center font-extrabold">Log In</h1>
          <SignInForm />
          <Link
            href="/user/signUp"
            className="block mt-4 text-center text-blue-500"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </main>
    </>
  );
}

export default SignIn;
