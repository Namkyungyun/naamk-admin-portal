"use client";

import "@/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/app/lib/apiClient";
import { setAccessToken } from "@/app/lib/auth";
import Logo from "@/app/svg/logo.svg";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiClient.post("/login", { email, password });
      setAccessToken(response.data.accessToken);
      router.replace("/dashboard");
    } catch (err) {
      setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">{/* <Logo /> */}</div>
        <form onSubmit={handleLogin}>
          <input
            type="string"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">로그인</button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
