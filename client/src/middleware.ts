import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req:req, secret: process.env.NEXTSECRECT });
  const url = req.nextUrl;
  console.log(process.env.NEXTSECRECT)

  console.log("Middleware token:", token);
  console.log("Middleware url:", url.pathname);

  // Redirect logged-in users away from /signin page
  if (token && url.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin", // protect signin for redirect logic
    "/hello", // protect this route, add more routes here
  ],
};
