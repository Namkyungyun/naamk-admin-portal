// "use client";
import PageTitle from "@/app/(portal)/component/PageTitle";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";

export default async function UserDetailPage({ params }) {
  // const { userId } = useParams(); // ✅ 여기서 직접 접근 가능
  const userId = params.userId;

  // ✅ 서버 컴포넌트에서 API 호출 (선택사항)
  // const user = await fetch(`https://your-api.com/users/${userId}`).then((res) =>
  //   res.json()
  // );

  // const [loading, setLoading] = useState(false);
  // const [fetchedApi, setFetchedApi] = useState(false);

  console.log(userId);
  /// init
  // useEffect(() => {}, []);

  return (
    <>
      {/* 제목 & 설명 영역 */}
      <PageTitle beforePages={["회원관리"]} currentPage="회원정보 상세" />
    </>
  );
}
