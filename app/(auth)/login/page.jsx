"use client";

import { useState } from "react";
import apiClient from "@/app/lib/apiClient";
import useAuth from "@/app/hooks/checkAuth";

export default function LoginPage() {
  const auth = useAuth();
  const api = apiClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await fetchAPI();
      auth.login(result.accessToken);
    } catch (err) {
      setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  const fetchAPI = async () => {
    return await api
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const entity = response.data.body.entity;
        return entity;
      })
      .catch((e) => {
        setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
      });
  };

  return (
    <div className="gradient-container">
      <div className="center-box">
        <div className="logo-container">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="string"
            placeholder="이메일"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
}
