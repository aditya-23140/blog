"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetail = async () => {
    try {
      let response = await fetch("/api/users/profile", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   // Authorization: `Bearer ${token}`,  // Uncomment if needed
        // },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      let result = await response.json();
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      let result = await fetch("/api/users/logout", {
        method: "GET",
      });
      console.log("Logout success");
      router.push("/user/signIn");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h2 className="mb-3">
        {data === "nothing" ? (
          "NONE"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
            )}
            </h2> */}
      <h1 className="text-4xl font-extrabold mb-4">PROFILE PAGE</h1>
      <div className=" flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/images/avatar.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-semibold">{data.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              @{data.username}
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground">
              {data.email}
            </CardDescription>
            <CardDescription className="text-sm text-muted-foreground">
              {data.date_of_birth ? format(data.date_of_birth, "PPP"): "none"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Welcome to your profile page. Here you can see your information
              and customize according to your needs.
            </p>
          </CardContent>
          <Button onClick={logout} className="w-1/2 self-center">
            Logout
          </Button>
        </Card>
      </div>
      {/* <Button onClick={getUserDetail} className="bg-green-400 m-3">
        Get user detail
      </Button> */}
    </div>
  );
}
