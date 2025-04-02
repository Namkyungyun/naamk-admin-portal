"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { message } from "antd";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import UserPenaltyDetailGrid from "../component/PenaltyDetailGrid";
import { ListCount, ListTable } from "@/app/(portal)/component/ListTable";
import Loading from "@/app/(portal)/component/Loading";

import {
  getUserById,
  getUserReportHist,
  updateUserPenaltyStatus,
} from "../actions";

export default function UserPenaltyDetailPage() {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // reported user data
  const initReportedUserData = {
    id: null,
    reportedUserId: null,
    reportedUserName: null,
    latestCreatedAt: null,
    userStatus: null,
    penaltyStatus: null,
    penaltyCreatedAt: null,
    penaltyCreatedBy: null,
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

  /// pagination data
  const visiblePageCount = 5;
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [reqSearchData, setReqSearchData] = useState({
    pageNo: 1,
    pageSize: 25,
  });
  const pageItemCountOptions = [
    { id: 1, value: 10, label: "10개씩" },
    { id: 2, value: 25, label: "25개씩" },
    { id: 3, value: 50, label: "50개씩" },
  ];

  /// penalty data
  const penaltyForm = {
    type: "user",
    isActive: null,
    description: null,
  };

  /// API [ reportDetailData, reportHistData ]
  const fetchInit = async () => {
    setLoading(true);

    const [reportDetailData, reportHistData] = await Promise.all([
      getUserById(userId),
      getUserReportHist(userId, reqSearchData),
    ]);

    // detail
    setReportedUserData(reportDetailData);
    penaltyForm.isActive = reportDetailData.penalty;
    penaltyForm.description = reportDetailData.penaltyDescription;
    // history
    setReportHistTableBody(reportHistData.content);
    setTotalPageNo(reportHistData.totalPages);
    setTotalItemCount(reportHistData.totalElements);

    // setPenaltyData(userDetailData);

    setFetchedInit(true);
    setLoading(false);
  };

  /// API [ penalty ]
  const fetchUpdate = async (formData) => {
    setLoading(true);

    const updated = await Promise.resolve(
      updateUserPenaltyStatus(userId, formData)
    );

    setLoading(false);

    const result = updated.id != null;
    const type = result ? "success" : "error";
    const message = result ? "저장되었습니다." : "저장되지 않았습니다.";
    onMessage(type, message);

    if (result) {
      onRefresh();
    }
  };

  const onPageChange = (page) => {
    reqSearchData.pageNo = page >= totalPageNo ? totalPageNo : page;

    if (fetchedInit) {
      fetchInit();
    }
  };

  const onPageItemCountChange = (count) => {
    reqSearchData.pageNo = 1;
    reqSearchData.pageSize = count;

    if (fetchedInit) {
      fetchInit();
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
            fetched={fetchedInit}
            reportedUser={reportedUserData ?? initReportedUserData}
            penaltyForm={penaltyForm}
            onUpdate={fetchUpdate}
          />
        </div>

        <div className="mt-4 mb-1 mr-1 flex items-center justify-between text-black">
          <SectionTitle title="동일 신고 목록" />
          <ListCount
            disabled={loading}
            totalItemCount={totalItemCount}
            optionData={pageItemCountOptions}
            defaultIndex={1}
            onChange={onPageItemCountChange}
          />
        </div>
        <div className="flex flex-col h-full overflow-hidden border border-bd-muted">
          {/* 테이블 */}
          <div className="px-1">
            <ListTable
              headers={reportHistTableHeader}
              body={reportHistTableBody}
            />
          </div>
        </div>
      </div>

      {/* loading  */}
      <Loading isLoading={loading} />

      <>{contextHolder}</>
    </>
  );
}
