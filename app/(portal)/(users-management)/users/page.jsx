"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSearchDatas, getUsers } from "./actions";
import PageTitle from "../../component/PageTitle";
import UserSearchBox from "./component/SearchBox";
import { ListCount, ListTable, Pagination } from "../../component/ListTable";

export default function UserListPage() {
  const router = useRouter();

  /// init data
  const [loading, setLoading] = useState(false);
  const [fetchedInit, setFetchedInit] = useState(false);
  const [initSearchData, setInitSearchData] = useState({});

  /// pageable
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

  const [reqSearch, setReqSearch] = useState({});

  /// table
  const tableHeader = [
    { variableName: "id", variableLabel: "구분" },
    {
      variableName: "name",
      variableLabel: "회원ID",
      url: "id",
      onButton: (url) => router.push(`/users/${url}`),
    },
    { variableName: "nickname", variableLabel: "사용자명" },
    { variableName: "userStatus", variableLabel: "계정 상태" },
    { variableName: "penaltyStatus", variableLabel: "제재 상태" },
    { variableName: "email", variableLabel: "이메일" },
    { variableName: "createdAt", variableLabel: "가입일시" },
  ];

  const [tableBody, setTableBody] = useState([]);

  /// init
  useEffect(() => {
    /// Search section API fetch
    const fetchInitData = async () => {
      setLoading(true);

      const searchOptions = await Promise.resolve(getSearchDatas());
      setInitSearchData(searchOptions);
      setItemCount(itemCountOptions[1].value); // 디폴트 item visible value

      setFetchedInit(true);
      setLoading(false);
    };

    fetchInitData();
  }, []);

  useEffect(() => {
    if (fetchedInit) {
      onSearch(reqSearch);
    }
  }, [currentPage, itemCount]);

  const onSearch = (searchData) => {
    setReqSearch(searchData);
    const fetchResultData = async () => {
      setLoading(true);

      /// Search Result API fetch
      const entity = await Promise.resolve(
        getUsers(searchData, { page: currentPage - 1, size: itemCount })
      );

      setTotalPage(entity.totalPages);
      setTotalItemCount(entity.totalElements);
      setTableBody(entity.content);

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

  const onItemCountChange = (count) => {
    setItemCount(count);
  };

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
            onSearch={onSearch}
          />
        </div>

        {/* 리스트 테이블 - item count */}
        <div className="h-8 mt-4 mb-1 flex items-center justify-end text-black gap-2">
          <ListCount
            totalItemCount={totalItemCount}
            optionData={itemCountOptions}
            defaultIndex={1}
            onChange={onItemCountChange}
          />
        </div>

        {/* 리스트 테이블 - 남은 영역 모두 차지 */}
        <div className="flex-1 overflow-auto mb-2 border border-bd-muted ">
          <ListTable headers={tableHeader} body={tableBody} />
        </div>

        {/* 페이지네이션 영역 */}
        <div className="h-12 flex items-center justify-center text-black gap-2">
          {tableBody.length !== 0 ? (
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
