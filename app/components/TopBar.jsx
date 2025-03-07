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
      {user ? <p>{user.name} 님 환영합니다.</p> : <p>로딩 중...</p>}
    </header>
  );
};

export default TopBar;
