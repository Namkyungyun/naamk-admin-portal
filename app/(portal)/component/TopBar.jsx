"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/apiClient";
import useAuth from "@/app/hooks/checkAuth";

const TopBar = () => {
  const auth = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // apiClient
    //   .get("/user/profile")
    //   .then((response) => setUser(response.data))
    //   .catch(console.error);
    setUser({
      name: "홍길동",
      loginAt: "2025.03.10 15:00:00",
    });
    setLoading(false);
  }, []);

  const onClickLogout = () => {
    auth.logout();
  };

  return (
    <header className="topbar">
      <div className="flex justify-between">
        <Link href="/dashboard" replace>
          <h2 className="sidebar-title">Community Admin</h2>
        </Link>
        <div className="flex">
          {!loading ? (
            <>
              {/* user info */}
              <div className="mx-5">
                <div className="flex">
                  <p className="text-left">{user.loginAt}</p>
                  <div className="mx-2"></div>
                  <p className="text-left">{user.name}</p>
                </div>
              </div>
              <div>
                {/* 로그아웃 버튼 */}
                <button onClick={() => onClickLogout()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
