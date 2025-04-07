"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PageTitle from "../../component/PageTitle";
import PostReportSearchBox from "./component/SearchBox";
import Loading from "../../component/Loading";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";

import { getSearchDatas, getPostReports } from "./actions";

export default function PostReportListPage() {
  const router = useRouter();

  /// data status
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  /// search data
  const [initSearchData, setInitSearchData] = useState({});
  const [reqSearchData, setReqSearchData] = useState({
    pageNo: 1,
    pageSize: 20,
  });

  /// pagination data
  const visiblePageCount = 5;
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const pageItemCountOptions = [
    { id: 1, value: 20, label: "20개씩" },
    { id: 2, value: 50, label: "50개씩" },
    { id: 3, value: 100, label: "100개씩" },
  ];

  /// table result
  const tableHeader = [
    { variableName: "rowNum", variableLabel: "구분" },
    { variableName: "id", variableLabel: "신고SEQ", hidden: true },
    { variableName: "latestCreatedAt", variableLabel: "최근 신고 일시" },
    {
      variableName: "reportedPostId",
      variableLabel: "게시글ID",
      url: "reportedPostId",
      onButton: (url) => router.push(`/post-reports/${url}`),
    },
    { variableName: "reportedUserName", variableLabel: "작성자ID" },
    { variableName: "reportedChannelName", variableLabel: "채널ID" },
    { variableName: "reportCount", variableLabel: "신고 건수" },
    { variableName: "reportStatus", variableLabel: "신고 상태" },
    { variableName: "penaltyStatus", variableLabel: "처리 상태" },
    { variableName: "penaltyCreatedAt", variableLabel: "처리일시" },
    { variableName: "penaltyCreatedBy", variableLabel: "처리자" },
  ];
  const [tableBody, setTableBody] = useState([]);

  /// search API
  const onSearch = (data) => {
    const fetchResultData = async () => {
      setLoading(true);

      /// Search Result API fetch
      const entity = await Promise.resolve(getPostReports(data));

      setTotalPageNo(entity.totalPages);
      setTotalItemCount(entity.totalElements);
      setTableBody(entity.content);

      setLoading(false);
    };

    fetchResultData();
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
    const fetchInitData = async () => {
      setLoading(true);

      const searchOptions = await Promise.resolve(getSearchDatas());
      setInitSearchData(searchOptions);

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInitData();
  }, []);

  useEffect(() => {
    if (refresh) {
      onSearch(reqSearchData);
      setRefresh(false);
    }
  }, [refresh, reqSearchData]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageTitle currentPage="게시글 신고 관리" />
          {/* 검색 박스 */}
          <PostReportSearchBox
            loading={loading}
            fetched={fetchedInit}
            fetchedSearchData={initSearchData}
            onSearch={(data) => {
              reqSearchData.pageNo = 1;
              setReqSearchData({ ...reqSearchData, ...data });
              onSearch({ ...reqSearchData, ...data });
            }}
          />
        </div>

        {/* 리스트 테이블 - item count */}
        <div className="h-8 mt-4 mb-1 flex items-center justify-end text-black gap-2">
          <ListCount
            disabled={loading}
            totalItemCount={totalItemCount}
            optionData={pageItemCountOptions}
            defaultIndex={0}
            onChange={onPageItemCountChange}
          />
        </div>

        {/* 리스트 테이블 - 남은 영역 모두 차지 */}
        <ListTable headers={tableHeader} body={tableBody} />

        {/* 페이지네이션 영역 */}
        <div className="h-12 flex items-center justify-center text-black gap-2">
          {!loading && tableBody.length !== 0 ? (
            <Pagination
              currentPage={reqSearchData.pageNo}
              totalPages={totalPageNo}
              onPageChange={onPageChange}
              maxVisible={visiblePageCount}
            />
          ) : null}
        </div>

        {/* loading  */}
        <Loading isLoading={loading} />
      </div>
    </>
  );
}
