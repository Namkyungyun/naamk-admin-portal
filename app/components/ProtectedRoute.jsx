"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/lib/auth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (!getAccessToken()) router.replace("/login");
  // }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
