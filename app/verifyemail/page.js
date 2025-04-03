"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Correct way to get URL parameters
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, SetError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      let result = await fetch(`/api/users/verifyemail`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      result = await result.json();
      if (result) {
        setVerified(true);
        SetError(false);
      }
    } catch (error) {
      SetError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    //search url and splitting token from url
    // const urlToken = window.location.search.split("=")[1];

    //another method
    SetError(false);
    const urlToken = searchParams.get("token"); // Correct way
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams.toString()]);

  useEffect(() => {
    SetError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl m-4">Verfy Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/user/signIn">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
