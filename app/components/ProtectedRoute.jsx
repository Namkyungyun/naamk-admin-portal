"use client";
import { useEffect, useState } from "react";
import useAuth from "@/app/hooks/checkAuth";
import LoadingPage from "./LoadingPage";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  /// mount
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // ✅ 토큰 확인 후 로딩 종료
      
      const currentPath = window.location.pathname;
      if (!auth.token) {
        if (currentPath != "/login" ) {
          auth.logout();
        }
      } else {
        if (currentPath == "/login") {
          auth.login();
        }
      }
    }, "100");
  });

  return <> {loading ? <LoadingPage /> : children}</>;
}
