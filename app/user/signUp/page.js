import React from "react";
import { RegisterForm } from "@/components/register";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md border px-4 py-8 rounded-md shadow-lg">
          <h1 className="mb-4 text-3xl text-center font-extrabold">SignUp</h1>
          <RegisterForm />
          <div className="mt-4 text-center text-sm relative -top-3">
            Already have an account?{" "}
            <Link href="/user/signIn" className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
