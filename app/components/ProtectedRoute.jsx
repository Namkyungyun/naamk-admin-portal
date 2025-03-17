"use client";
import { useEffect, useState } from "react";
import useAuth from "@/app/hooks/checkAuth";
import LoadingPage from "./LoadingPage";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  /// mount
  useEffect(() => {
    if (!auth.token) {
      auth.logout();
    } else {
      setLoading(false); // ✅ 토큰 확인 후 로딩 종료
    }
  }, []);

  return <> {loading ? <LoadingPage /> : children}</>;
}
