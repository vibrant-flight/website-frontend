import { NextRequest, NextResponse } from "next/server";

export function Proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const adminToken = request.cookies.get("adminToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname === "/users/login" || pathname === "/users/register";
  const isProtectedPage =
    pathname.startsWith("/users/cart") ||
    pathname.startsWith("/users/orders") ||
    pathname.startsWith("/users/profile");
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/users/login", request.url));
  }
  if (isAdminPage && !isAdminLogin && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/users/login",
    "/users/register",
    "/users/cart/:path*",
    "/users/orders/:path*",
    "/users/profile/:path*",
    "/admin/:path*",
  ],
};
