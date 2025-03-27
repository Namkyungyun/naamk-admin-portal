"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/(portal)/component/SideBar";
import TopBar from "@/app/(portal)/component/TopBar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function PortalLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isFirstLoad = useRef(true); // 최초 로딩 여부 추적

  useEffect(() => {
    if (typeof window !== "undefined" && isFirstLoad.current) {
      // 최초에만 사이즈에 따라 열림 상태 설정
      setIsSidebarOpen(window.innerWidth >= 1024);
      isFirstLoad.current = false;
    }

    const handleResize = () => {
      // 사용자가 수동으로 열고 닫은 뒤엔 자동 리사이징 무시 가능
      // 필요하면 아래 로직 사용:
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* ✅ TopBar: 상단 고정 */}
        <div className="h-[64px] shrink-0 z-10">
          <TopBar />
        </div>

        {/* ✅ 사이드바 + 콘텐츠 영역 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 사이드바 */}
          <aside className={`flex shrink-0 transition-all duration-300`}>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 min-w-0 overflow-auto bg-white p-4">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
