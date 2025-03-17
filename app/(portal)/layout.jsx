"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import apiClient from "@/app/lib/apiClient";
import SideBar from "@/app/(portal)/component/SideBar";
import TopBar from "@/app/(portal)/component/TopBar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function PortalLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
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

  return (
    <ProtectedRoute>
      <div className="layout-container">
        {/* 탑바 */}
        <TopBar />

        {/* 메인 컨텐츠 영역 */}
        <div className="main-wrapper">
          {/* 사이드바 */}
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* 페이지 컨텐츠 */}
          <main className="content-container">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
