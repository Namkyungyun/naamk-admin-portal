"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useClientApiHandler } from "@/app/api/useApiHandler";
import { postReportListData } from "@/app/api/post-reports/view-data";

import PageTitle from "../../component/PageTitle";
import PostReportSearchBox from "./component/SearchBox";
import Loading from "../../component/Loading";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";

export default function PostReportListPage() {
  const router = useRouter();

  const viewData = postReportListData();
  const { withClientApiHandler } = useClientApiHandler();

  /// data status
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  /// search data
  const [initSearchData, setInitSearchData] = useState({});
  const [reqSearchData, setReqSearchData] = useState(viewData.defaultPageParam);

  /// pagination data
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);

  /// table result
  const tableHeader = viewData.tableData(router);
  const [tableBody, setTableBody] = useState([]);

  /// searchOptions API
  const onInit = withClientApiHandler({
    init: () => setLoading(true),
    handler: () => fetch("/api/post-reports/search-options", { method: "GET" }),
    then: (body) => setInitSearchData(body),
    final: () => {
      setFetchedInit(true);
      setLoading(false);
    },
  });

  /// search API
  const onFetchSearch = (data) =>
    withClientApiHandler({
      init: () => setLoading(true),
      handler: () =>
        fetch("/api/post-reports/list", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      then: (body) => {
        setTotalPageNo(body.totalPages);
        setTotalItemCount(body.totalElements);
        setTableBody(body.content);
      },
      final: () => {
        setLoading(false);
      },
    })();

  const onSearch = ({ reqData, pageNo, pageSize }) => {
    let obj = {};

    if (reqData) {
      obj = { ...reqData };
    }

    if (pageNo) {
      obj.pageNo = pageNo;
    }

    if (pageSize) {
      obj.pageSize = pageSize;
    }

    setReqSearchData((prev) => ({
      ...prev,
      ...obj,
    }));

    if (fetchedInit) {
      setRefresh(true);
    }
  };

  /// init render
  useEffect(() => {
    onInit();
  }, []);

  // rebuild render
  useEffect(() => {
    if (refresh) {
      onFetchSearch(reqSearchData);
      setRefresh(false);
    }
  }, [reqSearchData, refresh]);

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
              onSearch({ reqData: data, pageNo: 1 });
            }}
          />
        </div>

        {/* 리스트 테이블 - item count */}
        <div className="h-8 mt-4 mb-1 flex items-center justify-end text-black gap-2">
          <ListCount
            disabled={loading}
            totalItemCount={totalItemCount}
            optionData={viewData.pageOptions}
            defaultIndex={viewData.defaultPageOptionIndex}
            onChange={(count) => onSearch({ pageNo: 1, pageSize: count })}
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
              onPageChange={(page) =>
                onSearch({ pageNo: page >= totalPageNo ? totalPageNo : page })
              }
              maxVisible={viewData.visiblePageNo}
            />
          ) : null}
        </div>

        {/* loading  */}
        <Loading isLoading={loading} />
      </div>
    </>
  );
}
