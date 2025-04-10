import globalAxios from "@/app/api/api";

import { getAccessToken } from "@/app/api/token";
import { NextResponse } from "next/server";

export function withServerTokenApiHandler(handler) {
  return async function (req, context) {
    try {
      const token = await getAccessToken();
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const api = globalAxios(token);
      return  handler(api, req, context);// handler(api, req, ...)
    } catch (err) {
      console.error("[withApiHandler] error:", err);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  };
}

export function withServerApiHandler(handler) {
    return async function (...args) {
      try {
        const api = globalAxios();
        return await handler(api, ...args); // handler(api, req, ...)
      } catch (err) {
        console.error("[withApiHandler] error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
    };
  }


  export async function serverApiWrapper(apiCallFn) {
    try {
      const res = await apiCallFn(); // 예: api.get(...)
      const data = res.data;
  
      if (!data) {
        return NextResponse.json({ message: "No data" }, { status: 404 });
      }
  
      return NextResponse.json(data);
    } catch (err) {
      console.error("❌ API 호출 실패:", err.message);
      console.error("📦 에러 응답:", err.response?.data);
  
      const status = err.response?.status ?? 500;
      const message = err.response?.data?.message || "Internal Server Error";
  
      return NextResponse.json({ message }, { status });
    }
  }