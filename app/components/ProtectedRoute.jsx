"use client";
import { useEffect, useState } from "react";
import useAuth from "@/app/hooks/checkAuth";

const ProtectedRoute = ({ children }) => {
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

  return <> {loading ? <p> Loading...</p> : children}</>;
};

export default ProtectedRoute;
