"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/lib/auth";
import apiClient from "@/app/lib/apiClient";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function PortalLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  useEffect(() => {
    // const token = getAccessToken();
    // if (!token) {
    //   router.replace("/login");
    //   return;
    // }
    // API 호출 전 토큰 검증 (예: 프로필 API 요청)
    // apiClient
    //   .get("/user/profile")
    //   .then(() => setIsAuthenticated(true))
    //   .catch(() => {
    //     router.replace("/login");
    //   });

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarHidden(true); // 화면이 작아지면 자동으로 사이드바 닫기
      } else {
        setIsSidebarHidden(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로딩 시 체크
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if (!isAuthenticated) return <p>Loading...</p>;

  return (
    // <ProtectedRoute>
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        isHidden={isSidebarHidden}
        toggleSidebar={() => setIsSidebarHidden(!isSidebarHidden)}
      />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <TopBar />
        <main className="main-content flex-1 flex flex-col gap-6 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
