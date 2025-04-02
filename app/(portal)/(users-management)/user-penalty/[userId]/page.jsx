"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { message } from "antd";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import UserPenaltyDetailGrid from "../component/PenaltyDetailGrid";
import { ListTable } from "@/app/(portal)/component/ListTable";
import Loading from "@/app/(portal)/component/Loading";

import {} from "../actions";

export default function UserPenaltyDetailPage() {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // reported user data
  const initReportedUserData = {
    id: null,
    userId: null,
    userName: null,
    reportCreatedAt: null,
    penaltyCreatedAt: null,
    penaltyCreatedBy: null,
    userStatus: null,
    penaltyStatusList: [],
  };
  const [reportedUserData, setReportedUserData] = useState(null);

  /// report history list
  const reportHistTableHeader = [
    { variableName: "id", variableLabel: "구분" },
    { variableName: "reportCreatedAt", variableLabel: "신고일시" },
    { variableName: "reportCreatedBy", variableLabel: "신고자" },
    { variableName: "reportStatus", variableLabel: "신고 상태" },
    { variableName: "penaltyStatus", variableLabel: "처리 상태" },
  ];
  const [reportHistTableBody, setReportHistTableBody] = useState([]);

  /// penalty data
  const penaltyForm = {
    type: "user",
    isActive: null,
    description: null,
  };

  /// API [ reportedUserData, reportHistData ]
  const fetchInit = async () => {
    setLoading(true);

    // const [userDetailData, penaltyHistData] = await Promise.all([
    //   getUserById(userId),
    //   getUserPenaltyHist(userId),
    // ]);

    // setUserData(userDetailData);
    // setPenaltyTableBody(penaltyHistData);
    // onInitUpdatePenaltyData(userDetailData);

    setFetchedInit(true);
    setLoading(false);
  };

  /// API [ penalty ]
  const fetchUpdate = async (formData) => {
    setLoading(true);

    // const updated = await Promise.resolve(
    //   updateUserPenaltyStatus(userId, updatePenaltyData)
    // );

    setLoading(false);

    const result = updated.id != null;
    const type = result ? "success" : "error";
    const message = result ? "저장되었습니다." : "저장되지 않았습니다.";
    onMessage(type, message);

    if (result) {
      onRefresh();
    }
  };

  ////
  const onMessage = (type, message) => {
    // type : error , success
    messageApi.open({
      type: type,
      content: message,
      duration: 5,
    });
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, "500");
  };

  /// init render
  useEffect(() => {
    fetchInit();
  }, []);

  /// rebuild render
  useEffect(() => {
    if (refresh) {
      fetchInit();
    }
  }, [refresh]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageSubTitle
            beforePages={["사용자 신고 관리"]}
            currentPage="사용자 신고정보 상세"
          />
          <SectionTitle title="사용자 신고정보" />
          <UserPenaltyDetailGrid
            loading={loading}
            reportedUser={reportedUserData ?? initReportedUserData}
            penaltyForm={penaltyForm}
          />
        </div>

        <div className="flex flex-col h-full mt-4 overflow-hidden border border-bd-muted">
          <SectionTitle title="동일 신고 목록" />
          {/* 테이블 */}
          <ListTable
            headers={reportHistTableHeader}
            body={reportHistTableBody}
          />
        </div>
      </div>

      {/* loading  */}
      <Loading isLoading={loading} />

      <>{contextHolder}</>
    </>
  );
}
