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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if (!isAuthenticated) return <p>Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="layout-container">
        {/* 사이드바 */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* 메인 컨텐츠 영역 */}
        <div className="main-wrapper">
          {/* 탑바 */}
          <TopBar />

          {/* 페이지 컨텐츠 */}
          <main className="content-container">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
