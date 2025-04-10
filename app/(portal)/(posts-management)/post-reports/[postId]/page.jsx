"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { useClientApiHandler } from "@/app/api/useApiHandler";

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
import { postReportDetailData } from "@/app/api/post-reports/[postId]/view-data";

export default function PostReportDetailPage() {
  const { postId } = useParams();
  const { showPenaltyMessage } = useToastMessage();

  const viewData = postReportDetailData();
  const { withClientApiHandler } = useClientApiHandler();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  // reported post data
  const initReportedDetailData = viewData.detailData;
  const [reportedDetailData, setReportedDetailData] = useState(null);

  /// report history list
  const reportHistTableHeader = viewData.histTableData;
  const [reportHistTableBody, setReportHistTableBody] = useState([]);

  /// pagination data
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [reqSearchData, setReqSearchData] = useState(viewData.defaultPageParam);

  /// API [ reportDetailData, reportHistData ]
  const fetchDetailApi = withClientApiHandler({
    init: () => setLoading(true),
    handler: () =>
      fetch(`/api/post-reports/${postId}/detail`, {
        method: "GET",
      }),
    then: (body) => {
      setReportedDetailData(body);
      viewData.penaltyReqData.isActive = body?.penalty;
      viewData.penaltyReqData.description = body?.penaltyDescription;
    },
    final: () => {
      setFetchedInit(true);
      setLoading(false);
    },
  });

  const fetchHisApi = withClientApiHandler({
    init: () => setLoading(true),
    handler: () => {
      const query = new URLSearchParams(reqSearchData).toString();
      return fetch(`/api/post-reports/${postId}/report-hist?${query}`, {
        method: "GET",
      });
    },
    then: (body) => {
      const pagenation = body?.pagenation;
      setReportHistTableBody(pagenation?.content);
      setTotalPageNo(pagenation?.totalPages);
      setTotalItemCount(body?.newReportCount);
    },
    final: () => {
      setLoading(false);
    },
  });

  const fetchInit = async () => {
    fetchDetailApi();
    fetchHisApi();
  };

  /// API [ penalty ]
  const fetchUpdate = async (formData) =>
    withClientApiHandler({
      init: () => setLoading(true),
      handler: () =>
        fetch(`/api/posts/${postId}/penalty-update`, {
          method: "POST",
          body: JSON.stringify(formData),
        }),
      then: (body) => {
        const result = body.linkedId != null;

        setLoading(false);
        showPenaltyMessage(result);

        if (result) {
          setRefresh(true);
        }

        return result;
      },
      final: () => {
        setLoading(false);
      },
    })();

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
            penaltyForm={viewData.penaltyReqData}
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
            optionData={viewData.pageOptions}
            defaultIndex={viewData.defaultPageOptionIndex}
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
                maxVisible={viewData.visiblePageNo}
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
