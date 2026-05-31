import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "zanvore-admin";
const USER_PROTECTED = ["/feed", "/profile", "/company"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    if (token !== ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (USER_PROTECTED.some((p) => pathname.startsWith(p))) {
    const session = request.cookies.get("better-auth.session_token");
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/feed/:path*", "/profile/:path*", "/company/:path*"],
};
