"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, {
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
    <div className="gradient-container flex-col">
      <div className="flex mb-8 items-center">
        <img
          src="/assets/gemhubplay.png"
          className="w-40 mr-5 rounded-lg bg-gray p-5"
          alt="Logo"
        />
        <span className="text-[42px] font-bold">Admin</span>
      </div>
      <div className="center-box">
        <div className="h-12 flex justify-center items-center">
          {state?.error && (
            <p className="text-fg-danger bg-red-200 text-sm text-center w-[400px]">
              {state.error}
            </p>
          )}
        </div>
        <form action={formAction} className="flex justify-center h-28">
          <div className="mx-4">
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-bold mr-10">ID</span>
              <input
                type="text"
                name="username"
                placeholder="ID를 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-bold mr-10">PW</span>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
