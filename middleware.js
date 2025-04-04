// https://nextjs.org/docs/app/building-your-application/routing/middleware
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname; //used to find path of user

  const isPublicPath =
    path === "/" ||
    path === "/user/signIn" ||
    path === "/user/signUp" ||
    path === "/verifyemail" ||
    path === "/resetpassword";

  //to avoid public path when already logged in using tokens
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/main", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
//tell which page these logic should work on
export const config = {
  matcher: [
    "/",
    "/user/signIn",
    "/user/signUp",
    "/verifyemail",
    "/resetpassword",
    "/profile",
    "/main",
  ],
};
