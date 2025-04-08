"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToastMessage } from "@/app/provider/MessageProvider";

import PageTitle from "../../component/PageTitle";
import PostReportSearchBox from "./component/SearchBox";
import Loading from "../../component/Loading";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";

import { postReportListSearchAPI, postReportListAPI } from "./actions";

export default function PostReportListPage() {
  const router = useRouter();

  const postReports = postReportListAPI();
  const searchOptions = postReportListSearchAPI();

  /// data status
  const { showMessage } = useToastMessage();
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const commonQueryConfig = {
    enabled: false, // 초기 자동 호출
    retry: false,
    cacheTime: 0, // 캐시가 메모리에 유지되는 시간
    staleTime: 0, // 데이터가 신선한 상태로 유지되는 시간
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };

  /////// search option
  const { data: searchOptionsData, refetch: refetchSearchOptions } = useQuery({
    queryKey: ["postReportSearchOptions"],
    queryFn: searchOptions.fetchAPI,
    ...commonQueryConfig,
  });
  /// search option result
  const initSearchData = searchOptionsData || {};
  const [reqSearchData, setReqSearchData] = useState(
    searchOptions.defaultPageParam
  );

  /////// search
  const { data: postReportsData, refetch: refetchPostReports } = useQuery({
    queryKey: ["postReports", reqSearchData],
    queryFn: () => postReports.fetchAPI(reqSearchData),
    ...commonQueryConfig,
  });
  /// search result
  const tableHeader = postReports.responseData(router);
  const tableBody = refresh ? [] : postReportsData?.content || [];
  const totalPageNo = refresh ? 0 : postReportsData?.totalPages || 0;
  const totalItemCount = refresh ? 0 : postReportsData?.totalElements || 0;

  /// init API
  const onFetchInit = async () => {
    setLoading(true);

    try {
      const result = await refetchSearchOptions();
      if (result.error) throw result.error; // ✅ 수동 처리
    } catch (e) {
      onError();
    }

    setFetchedInit(true);
    setLoading(false);
  };

  /// search API
  const onFetchSearch = async () => {
    setLoading(true);

    try {
      const result = await refetchPostReports();
      if (result.error) throw result.error; // ✅ 수동 처리
    } catch (err) {
      queryClient.setQueryData(["postReports", reqSearchData], null); // 또는 []
      onError();
    }

    setRefresh(false);
    setLoading(false);
  };

  /// API error message
  const onError = () => {
    showMessage({ type: "error", content: "데이터 조회에 실패하였습니다." });
  };

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
    onFetchInit();
  }, []);

  // rebuild render
  useEffect(() => {
    if (refresh) {
      onFetchSearch();
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
            optionData={searchOptions.pageOptions}
            defaultIndex={searchOptions.defaultPageOptionIndex}
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
              maxVisible={searchOptions.visiblePageNo}
            />
          ) : null}
        </div>

        {/* loading  */}
        <Loading isLoading={loading} />
      </div>
    </>
  );
}
