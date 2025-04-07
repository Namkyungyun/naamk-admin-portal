"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PageTitle from "../../component/PageTitle";
import UserSearchBox from "./component/SearchBox";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";
import Loading from "../../component/Loading";

import { fetchUsersSearch, fetchUsers } from "./actions";

export default function UserListPage() {
  const router = useRouter();
  const searchOptions = fetchUsersSearch();
  const users = fetchUsers();

  /// data status
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);

  /// search data
  const [initSearchData, setInitSearchData] = useState({});
  const [reqSearchData, setReqSearchData] = useState(
    searchOptions.defaultPageParam
  );

  /// pagination data
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const pageItemCountOptions = searchOptions.pageOptions;

  /// table result
  const tableHeader = users.responseData(router);
  const [tableBody, setTableBody] = useState([]);

  /// init API
  const onInit = () => {
    const fetchInitData = async () => {
      setLoading(true);

      const data = await Promise.resolve(searchOptions.fetchAPI());
      setInitSearchData(data);

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInitData();
  };

  /// search API
  const onSearch = (data) => {
    const fetchResultData = async () => {
      setLoading(true);

      /// Search Result API fetch
      const result = await Promise.resolve(users.fetchAPI(data));
      if (result) {
        setTotalPageNo(result.totalPages);
        setTotalItemCount(result.totalElements);
        setTableBody(result.content);
      }

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

  /// init
  useEffect(() => {
    /// Search section API fetch
    onInit();
  }, []);

  /// rebuild render
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
          <PageTitle currentPage="회원관리" />

          {/* 검색 박스 */}
          <UserSearchBox
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
            defaultIndex={searchOptions.defaultPageOptionIndex}
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
