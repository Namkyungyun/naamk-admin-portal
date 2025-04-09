"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/app/provider/UserProvider";

const TopBar = ({ onLogout }) => {
  const { userInfo } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    setUser({
      name: userInfo?.name,
      loginAt: userInfo?.loginAt,
    });
  }, [userInfo]);

  const onClickLogout = () => {
    onLogout();
  };

  return (
    <header className="topbar">
      <div className="flex justify-between">
        <Link href="/dashboard" replace>
          <img
            src="/assets/gemhubplay.png"
            className="w-50 rounded-lg bg-gray px-8 py-2"
            alt="Logo"
          />
        </Link>
        <div className="flex">
          {/* user info */}
          <div className="mx-5">
            <div className="flex">
              <p className="text-left">{user?.loginAt}</p>
              <div className="mx-2"></div>
              <p className="text-left">{user?.name}</p>
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
        </div>
      </div>
    </header>
  );
};

export default TopBar;
