"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, []);

  return <p className="text-gray-500 text-center mt-10">Redirecting...</p>;
}
