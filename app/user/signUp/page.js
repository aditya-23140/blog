import React from "react";
import { RegisterForm } from "@/components/register";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <main className="flex justify-center items-center pb-10 h-[90dvh] min-h-fit">
        <div className="py-12 bg-accent px-4 w-[80dvw] min-[650px]:w-[45dvw] rounded-lg">
          <h1 className="mb-4 text-3xl text-center font-extrabold">SignUp</h1>
          <RegisterForm />
        <Link href="/user/signIn">Login page</Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
