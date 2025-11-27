"use server";

import { NextRequest, NextResponse } from "next/server";

export async function refreshTokenFetch(request: NextRequest, refreshToken: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_LOCAL;
  try {
    const response = await fetch(`${apiUrl}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`,
      },
      credentials: "include"
    });

    if (!response.ok) {
      return {
        success: false,
        response: NextResponse.redirect(new URL("/login", request.url)),
      };
    }

    // Set-Cookie 헤더 추출
    const setCookieHeaders = response.headers.getSetCookie();

    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      console.error("[Auth] Set-Cookie 헤더 없음");
      return {
        success: false,
        response: NextResponse.redirect(new URL("/login", request.url)),
      };
    }

    // NextResponse에 각 쿠키 추가
    const res = NextResponse.next();
    setCookieHeaders.forEach(cookie => {
      res.headers.append("set-cookie", cookie);
    });

    console.log("[Auth] 토큰 갱신 성공");
    return {
      success: true,
      response: res,
    };
  } catch (error) {
    console.error("[Auth] 토큰 갱신 에러:", error);
    return {
      success: false,
      response: NextResponse.redirect(new URL("/auth/login", request.url)),
    };
  }
}
