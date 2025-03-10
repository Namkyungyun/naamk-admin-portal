"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/lib/auth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(getAccessToken());

    // if (!token) {
    //   console.log("?! ");
    //   router.replace("/login");
    // } else {
    //   setLoading(false); // ✅ 토큰 확인 후 로딩 종료
    // }
  }, [token]);

  return <> {loading ? <p> Loading...</p> : children}</>;
};

export default ProtectedRoute;
