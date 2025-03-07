"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import apiClient from "@/app/lib/apiClient";

const TopBar = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   apiClient
  //     .get("/user/profile")
  //     .then((response) => setUser(response.data))
  //     .catch(console.error);
  // }, []);

  const [user, setUser] = useState({ name: "홍길동" });

  return (
    <header className="topbar">
      <div className="flex justify-between">
        <div></div>
        <div className="flex">
          <div className="mx-5">
            {user ? (
              <p className="text-left">{user.name}dfsfds</p>
            ) : (
              <p>로딩 중...</p>
            )}
          </div>
          <div>
            <button>로그아웃</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
