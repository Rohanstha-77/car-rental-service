import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTSECRECT });
  const url = req.nextUrl;

  // ✅ 1. If user is logged in and visiting /signin, redirect to 
  if (token && url.pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ 2. If user is not logged in and visiting a protected route (like /)
  if (!token && url.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ✅ 3. Otherwise, let them through
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin"], // Add more protected routes here
};
