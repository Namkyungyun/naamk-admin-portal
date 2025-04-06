"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { message } from "antd";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import UserReportDetailGrid from "../component/DetailGrid";
import { ListCount, ListTable } from "@/app/(portal)/component/ListTable";
import Loading from "@/app/(portal)/component/Loading";

import {
  getUserById,
  getUserReportHist,
  updateUserPenaltyStatus as updatePenaltyStatus,
} from "../actions";

export default function UserReportDetailPage() {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // reported user data
  const initReportedDetailData = {
    id: null,
    reportedUserId: null,
    reportedUserName: null,
    latestCreatedAt: null,
    userStatus: null,
    penalty: null, // 처리상태 value (true, false, null)
    penaltyStatus: null,
    penaltyDescription: null, // 제재사유
    penaltyCreatedAt: null,
    penaltyCreatedBy: null,
    penaltyStatusList: [],
  };
  const [reportedDetailData, setReportedDetailData] = useState(null);

  /// report history list
  const reportHistTableHeader = [
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "", hidden: true },
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

    const [reportDetailData, reportHisData] = await Promise.all([
      getUserById(userId),
      getUserReportHist(userId, reqSearchData),
    ]);

    // detail
    setReportedDetailData(reportDetailData);
    if (reportDetailData) {
      penaltyForm.isActive = reportDetailData?.penalty;
      penaltyForm.description = reportDetailData?.penaltyDescription;
    }
    // history
    if (reportHisData) {
      const pagenation = reportHisData?.pagenation;

      setReportHistTableBody(pagenation?.content);
      setTotalPageNo(pagenation?.totalPages);
      setTotalItemCount(reportHisData?.newReportCount);
    }

    setFetchedInit(true);
    setLoading(false);
  };

  /// API [ penalty ]
  const fetchUpdate = async (formData) => {
    setLoading(true);

    const updated = await Promise.resolve(
      updatePenaltyStatus(userId, formData)
    );

    setLoading(false);

    const result = updated.id != null;
    const type = result ? "success" : "error";
    const message = result ? "(TP)신고 처리완료" : "(TP)신고 처리실패";
    onMessage(type, message);

    if (result) {
      onRefresh();
    }

    return result;
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
          <UserReportDetailGrid
            loading={loading}
            fetched={fetchedInit}
            detailData={reportedDetailData ?? initReportedDetailData}
            penaltyForm={penaltyForm}
            onUpdate={fetchUpdate}
            onCancel={onMessage}
          />
        </div>

        <div className="mt-4 mb-1 mr-1 flex items-center justify-between text-black">
          <SectionTitle title="동일 신고 목록" />
          <ListCount
            title="신규접수"
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
