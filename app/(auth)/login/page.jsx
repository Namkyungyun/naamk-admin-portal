"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tryLogin } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(tryLogin, {
    error: null,
    success: false,
  });

  // 🎯 로그인 성공 시 클라이언트에서 이동
  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state]);

  return (
    <div className="gradient-container">
      <div className="center-box">
        <div className="logo-container">
          {/* <img src="/logo.svg" alt="Logo" /> */}
        </div>
        <form action={formAction}>
          <input type="text" name="username" placeholder="아이디" />
          <input type="password" name="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>

        {state?.error && <p className="text-red-500 mt-4">{state.error}</p>}
      </div>
    </div>
  );
}
