"use client";

import { setAccessToken, removeAccessToken, getAccessToken } from "@/app/lib/auth";
import { useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(
    typeof window !== "undefined" ? getAccessToken() : null
  );
  const isLoggingOut = useRef(false);

  // 로그인 함수
  const login = (newToken) => {
    if (typeof window !== "undefined") {
      setToken(newToken);
      setAccessToken(newToken);

      router.push("/dashboard");
    }
  };

  // 로그아웃 함수 (중복 실행 방지)
  const logout = () => {
    if (isLoggingOut.current || typeof window === "undefined") return;
    isLoggingOut.current = true;

    setToken(null);
    removeAccessToken();
    
    setTimeout(() => {
      isLoggingOut.current = false;
    }, 1000);

    redirect("/login");
  };


  return { token, login, logout };
}
