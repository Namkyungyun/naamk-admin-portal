"use client";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import UserDetailGrid from "../component/DetailGrid";
import TabComponent from "@/app/(portal)/component/Tab";
import { ListTable } from "@/app/(portal)/component/ListTable";

export default function UserDetailPage() {
  const { userId } = useParams(); // ✅ 여기서 직접 접근 가능

  const [loading, setLoading] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);
  const [userData, setUserData] = useState({});

  /// penalty table
  const penaltyTableHeader = [
    { variableName: "id", variableLabel: "구분" },
    { variableName: "name", variableLabel: "처리일시" },
    { variableName: "nickname", variableLabel: "처리자" },
    { variableName: "userStatus", variableLabel: "제재 상태" },
    { variableName: "penaltyStatus", variableLabel: "제재사유" },
    { variableName: "email", variableLabel: "신고보기" },
  ];
  const [penaltyTableBody, setPenaltyTableBody] = useState([]);

  /// init
  useEffect(() => {}, []);

  const tabs = [
    {
      id: 1,
      label: "자산정보",
      content: (
        <div className="flex justify-center h-30 items-center text-gray-400">
          재화정책 정리후 작성예정
        </div>
      ),
    },
    {
      id: 2,
      label: "제재이력",
      content: (
        <ListTable
          headers={penaltyTableHeader}
          body={penaltyTableBody}
          buttons={{
            name: (url) => {
              router.push(`/users/${url}`);
            },
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageSubTitle
            beforePages={["회원관리"]}
            currentPage="회원정보 상세"
          />
          <SectionTitle title="기본정보" />
          <UserDetailGrid />
        </div>

        <div className="flex flex-col h-full mt-4">
          <TabComponent tabs={tabs} />
        </div>
      </div>
    </>
  );
}
