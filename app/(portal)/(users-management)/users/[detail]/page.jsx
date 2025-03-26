"use client";
import PageTitle from "@/app/(portal)/component/PageTitle";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserDetailPage() {
  const params = useParams(); // ✅ 여기서 직접 접근 가능
  const [loading, setLoading] = useState(false);
  const [fetchedApi, setFetchedApi] = useState(false);

  /// init
  useEffect(() => {}, []);

  return (
    <>
      {/* 제목 & 설명 영역 */}
      <PageTitle beforePages={["회원관리"]} currentPage="회원정보 상세" />
    </>
  );
}
