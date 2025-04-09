import { NextResponse } from 'next/server';


export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

    // ✅ 로그 찍어보기
    // console.log("middleware - token:", token);
    // console.log("middleware - path:", req.nextUrl.pathname);
    

  // 👉 로그인한 경우 "/" 접속 시 dashboard로 리디렉트
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 👉 비로그인 상태에서 보호된 페이지 접근 시 로그인으로 리디렉트
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
