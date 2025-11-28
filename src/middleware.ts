import { NextRequest, NextResponse } from "next/server";
import { isPublicRoute } from "./middleware/routes";
import { refreshTokenFetch } from "./middleware/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  console.log('🚀 ~ middleware.ts:8 ~ middleware ~ accessToken:', accessToken);
  const refreshToken = request.cookies.get("refresh_token")?.value;
  console.log('🚀 ~ middleware.ts:10 ~ middleware ~ refreshToken:', refreshToken);
  const isPublic = isPublicRoute(pathname);

  if (pathname.startsWith('/api')) {
      return NextResponse.next();
    }

  // if (pathname === "/") {
  //   return NextResponse.next();
  // }

  if (accessToken && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !accessToken && refreshToken) {
    const result = await refreshTokenFetch(request, refreshToken);
    return result.response;
  }

  if (!isPublic && !accessToken && !refreshToken) {
    console.log(`Redirecting to login: ${pathname}`);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};