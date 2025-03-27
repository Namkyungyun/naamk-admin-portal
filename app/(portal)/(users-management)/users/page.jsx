"use client";

import { getSearchDatas, getUsers } from "./actions";
import { useState, useEffect } from "react";
import PageTitle from "../../component/PageTitle";
import UserSearchBox from "./component/searchbox";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";
import { useRouter } from "next/navigation";

export default function UserListPage() {
  const router = useRouter();

  /// init data
  const [loading, setLoading] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [resultData, setResultData] = useState([]);

  /// page
  const paginationCount = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const itemCountOptions = [
    { id: 1, value: 20, label: "20개씩" },
    { id: 2, value: 50, label: "50개씩" },
    { id: 3, value: 100, label: "100개씩" },
  ];

  /// init
  useEffect(() => {
    /// Search section API fetch
    const fetchInitData = async () => {
      setLoading(true);

      const searchOptions = await Promise.resolve(getSearchDatas());
      setSearchData(searchOptions);
      setItemCount(itemCountOptions[1].value); // 디폴트 item visible value

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInitData();
  }, []);

  const onSearch = (searchData) => {
    const fetchResultData = async () => {
      setLoading(true);

      /// Search Result API fetch
      const entity = await Promise.resolve(
        getUsers(searchData, { page: currentPage - 1, size: itemCount })
      );

      setTotalPage(entity.totalPages);
      setTotalItemCount(entity.totalElements);
      setResultData(entity.content);

      setFetchedInit(true);
      setLoading(false);
    };

    fetchResultData();
  };

  const onPageChange = (page) => {
    if (page >= totalPage) {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          {/* 상단 제목 */}
          <PageTitle currentPage="회원관리" />

          {/* 검색 박스 */}
          <UserSearchBox
            loading={loading}
            fetched={fetchedInit}
            fetchedSearchData={searchData}
            onSearch={onSearch}
          />
        </div>

        {/* 리스트 테이블 - item count */}
        <div className="h-8 mt-4 mb-1 flex items-center justify-end text-black gap-2">
          <ListCount
            totalItemCount={totalItemCount}
            optionData={itemCountOptions}
            defaultIndex={1}
            onChange={(value) => {
              setItemCount(value);
            }}
          />
        </div>

        {/* 리스트 테이블 - 남은 영역 모두 차지 */}
        <div className="flex-1 overflow-auto mb-2 border border-bd-muted ">
          <ListTable
            headers={searchData.tableHeaders}
            body={resultData}
            buttons={{
              name: (url) => {
                router.push(`/users/${url}`);
              },
            }}
          />
        </div>

        {/* 페이지네이션 영역 */}
        <div className="h-12 flex items-center justify-center text-black gap-2">
          {resultData.length !== 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={onPageChange}
              maxVisible={paginationCount}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
