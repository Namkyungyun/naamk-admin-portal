"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {} from "./actions";

import PageTitle from "../../component/PageTitle";
import Loading from "../../component/Loading";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";
import UserPenaltySearchBox from "./component/SearchBox";

export default function UserPenaltyListPage() {
  const router = useRouter();

  /// data status
  const [loading, setLoading] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  /// search data
  const [initSearchData, setInitSearchData] = useState({});
  const [reqSearchData, setReqSearchData] = useState({});

  /// pagination data
  const visiblePageCount = 5;
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [pageTotalItemCount, setPageTotalItemCount] = useState(0);
  const [pageItemCount, setPageItemCount] = useState(0);
  const pageItemCountOptions = [
    { id: 1, value: 20, label: "20개씩" },
    { id: 2, value: 50, label: "50개씩" },
    { id: 3, value: 100, label: "100개씩" },
  ];

  /// table result
  const tableHeader = [
    { variableName: "id", variableLabel: "구분" },
    {
      variableName: "lastestReportedAt",
      variableLabel: "최근신고일시",
      url: "id",
      onButton: (url) => router.push(`/users/${url}`),
    },
    { variableName: "name", variableLabel: "대상자ID" },
    { variableName: "totalReportCount", variableLabel: "신고 건수" },
    { variableName: "reportStatus", variableLabel: "신고 상태" },
    { variableName: "penaltyStatus", variableLabel: "처리 상태" },
    { variableName: "createdAt", variableLabel: "처리일시" },
    { variableName: "createdBy", variableLabel: "처리자" },
  ];
  const [tableBody, setTableBody] = useState([]);

  /// init render
  useEffect(() => {
    const fetchInitData = async () => {
      setLoading(true);

      // const searchOptions = await Promise.resolve(getSearchDatas());
      // setInitSearchData(searchOptions);
      // setPageItemCount(itemCountOptions[1].value); // 디폴트 item visible value

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInitData();
  }, []);

  /// rebuild render
  useEffect(() => {
    if (fetchedInit) {
      onSearch(reqSearchData);
    }
  }, [currentPageNo, pageItemCount]);

  /// search API
  const onSearch = (searchData) => {
    setReqSearchData(searchData);
    const fetchResultData = async () => {
      setLoading(true);

      /// Search Result API fetch
      // const entity = await Promise.resolve(
      //   getUsers(searchData, { page: currentPage - 1, size: pageItemCount })
      // );

      // setTotalPage(entity.totalPages);
      // setPageTotalItemCount(entity.totalElements);
      // setTableBody(entity.content);

      setLoading(false);
    };

    fetchResultData();
  };

  const onPageChange = (page) => {
    if (page >= totalPageNo) {
      setCurrentPageNo(totalPageNo);
    } else {
      setCurrentPageNo(page);
    }
  };

  const onPageItemCountChange = (count) => {
    setPageItemCount(count);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 화면명 */}
          <PageTitle currentPage="사용자 신고 관리" />

          {/* 검색 박스 */}
          <UserPenaltySearchBox
            loading={loading}
            fetched={fetchedInit}
            fetchedSearchData={initSearchData}
            onSearch={onSearch}
          />
        </div>

        {/* 리스트 테이블 - item count */}
        <div className="h-8 mt-4 mb-1 flex items-center justify-end text-black gap-2">
          <ListCount
            disabled={loading}
            totalItemCount={pageTotalItemCount}
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
              currentPage={currentPageNo}
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
