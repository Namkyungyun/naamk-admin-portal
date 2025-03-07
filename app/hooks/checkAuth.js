"use client"; // ✅ 클라이언트 전용 설정

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null
  );
  const router = useRouter();
  const isLoggingOut = useRef(false);

  // 로그인 함수
  const login = (newToken) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", newToken);
      setToken(newToken);
      router.push("/dashboard");
    }
  };

  // 로그아웃 함수 (중복 실행 방지)
  const logout = () => {
    if (isLoggingOut.current || typeof window === "undefined") return;
    isLoggingOut.current = true;

    sessionStorage.removeItem("accessToken");
    setToken(null);

    router.push("/login");

    setTimeout(() => {
      isLoggingOut.current = false;
    }, 1000);
  };

  // ✅ 로그인 상태를 감지하고, `token`이 변경될 때 `logout()` 실행하도록 수정
  const checkAuth = () => {
      if (token === null && typeof window !== "undefined") {
        const storedToken = sessionStorage.getItem("accessToken");
        if (!storedToken) logout(); // 🔥 무한 루프 방지
      }
  }

  return { token, login, logout, checkAuth };
}
