"use client";

import { useState, useEffect } from "react";

export default function UserListPage() {
  const [loading, setLoading] = useState(false);
  const [fetchedApi, setFetchedApi] = useState(false);

  /// init
  useEffect(() => {}, []);

  return (
    <>
      {/* 제목 & 설명 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">제목이랑 설명이 들어갈 영역</p>
      </section>
    </>
  );
}
