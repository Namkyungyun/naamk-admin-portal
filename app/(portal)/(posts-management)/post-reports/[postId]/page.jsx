"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { useToastMessage } from "@/app/provider/MessageProvider";
import PageSubTitle from "@/app/(portal)/component/PageSubTitle";
import SectionTitle from "@/app/(portal)/component/SectionTitle";
import PostReportDetailGrid from "../component/DetailGrid";
import {
  ListCount,
  ListTable,
  Pagination,
} from "@/app/(portal)/component/ListTable";
import Loading from "@/app/(portal)/component/Loading";

import {
  fetchPostReportSearch,
  fetchPostReport,
  fetchPostReportHist,
  fetchPenaltyUpdate,
} from "../actions";

export default function PostReportDetailPage() {
  const { postId } = useParams();
  const { showPenaltyMessage, showMessage } = useToastMessage();

  const searchOptions = fetchPostReportSearch();
  const postReport = fetchPostReport();
  const postReportHist = fetchPostReportHist();
  const penaltyUpdate = fetchPenaltyUpdate();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // reported post data
  const initReportedDetailData = postReport.responseData;
  const [reportedDetailData, setReportedDetailData] = useState(null);

  /// report history list
  const reportHistTableHeader = postReportHist.responseData;
  const [reportHistTableBody, setReportHistTableBody] = useState([]);

  /// pagination data
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [reqSearchData, setReqSearchData] = useState(
    searchOptions.defaultPageParam
  );

  /// API [ reportDetailData, reportHistData ]
  const fetchInit = async () => {
    setLoading(true);

    const [reportDetailData, reportHisData] = await Promise.all([
      postReport.fetchAPI(postId),
      postReportHist.fetchAPI(postId, reqSearchData),
    ]);

    // detail
    if (reportDetailData) {
      setReportedDetailData(reportDetailData);
      penaltyUpdate.requestData.isActive = reportDetailData.penalty;
      penaltyUpdate.requestData.description =
        reportDetailData.penaltyDescription;
    }

    // history
    if (reportHisData) {
      const pagenation = reportHisData?.pagenation;
      setReportHistTableBody(pagenation.content);
      setTotalPageNo(pagenation.totalPages);
      setTotalItemCount(reportHisData?.newReportCount);
    }

    setFetchedInit(true);
    setLoading(false);
  };

  /// API [ penalty ]
  const fetchUpdate = async (formData) => {
    setLoading(true);

    const updated = await Promise.resolve(
      penaltyUpdate.fetchAPI(postId, formData)
    );
    const result = updated.linkedId != null;

    setLoading(false);
    showPenaltyMessage(result);

    if (result) {
      setRefresh(true);
    }

    return result;
  };

  const onPageChange = (page) => {
    setReqSearchData((prev) => ({
      ...prev,
      pageNo: page >= totalPageNo ? totalPageNo : page,
    }));

    if (fetchedInit) {
      setRefresh(true);
    }
  };

  const onPageItemCountChange = (count) => {
    setReqSearchData((prev) => ({
      ...prev,
      pageNo: 1,
      pageSize: count,
    }));

    if (fetchedInit) {
      setRefresh(true);
    }
  };

  /// init render
  useEffect(() => {
    fetchInit();
  }, []);

  /// rebuild render
  useEffect(() => {
    if (refresh) {
      fetchInit();
      setRefresh(false);
    }
  }, [refresh, reqSearchData]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageSubTitle
            beforePages={["게시글 신고 관리"]}
            currentPage="신고정보 상세"
          />
          <SectionTitle title="게시글 신고정보" />
          <PostReportDetailGrid
            loading={loading}
            fetched={fetchedInit}
            detailData={reportedDetailData ?? initReportedDetailData}
            penaltyForm={penaltyUpdate.requestData}
            onUpdate={fetchUpdate}
            onCancel={() => showPenaltyMessage(null)}
          />
        </div>

        <div className="mt-4 mb-1 mr-1 flex items-center justify-between text-black">
          <SectionTitle title="동일 신고 목록" />
          <ListCount
            title="신규접수"
            disabled={loading}
            totalItemCount={totalItemCount}
            optionData={searchOptions.pageOptions}
            defaultIndex={searchOptions.defaultPageOptionIndex}
            onChange={onPageItemCountChange}
          />
        </div>

        <div className="flex flex-col h-full">
          {/* 테이블 */}
          <div className="px-1 mb-4 h-full">
            <ListTable
              headers={reportHistTableHeader}
              body={reportHistTableBody}
            />
          </div>
          <div className="h-12 flex items-center justify-center text-black gap-2 mb-4">
            {!loading && reportHistTableBody.length !== 0 ? (
              <Pagination
                currentPage={reqSearchData.pageNo}
                totalPages={totalPageNo}
                onPageChange={onPageChange}
                maxVisible={searchOptions.visiblePageNo}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* loading  */}
      <Loading isLoading={loading} />
    </>
  );
}
