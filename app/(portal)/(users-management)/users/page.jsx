"use client";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(30);
  const [totalItemCount, setTotalItemCount] = useState(30);
  const [visibleItemCount, setVisibleItemCount] = useState(0);

  /// init
  useEffect(() => {
    setLoading(true);

    /// Search section API fetch
    setSearchData({
      userStatus: [{ id: 1, value: "value1", label: "선택1" }],
      penaltyStatus: [{ id: 1, value: "value1", label: "선택1" }],
    });

    setFetchedInit(true);

    setTimeout(() => {
      setLoading(false);
    }, "1000");
  }, []);

  const onSearch = (searchData) => {
    setLoading(true);

    console.log(searchData);

    // 검색 결과 API fetch

    setTimeout(() => {
      setLoading(false);
    }, "1000");
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
            optionData={[
              { id: 1, value: 20, label: "20개씩" },
              { id: 2, value: 50, label: "50개씩" },
              { id: 3, value: 100, label: "100개씩" },
            ]}
            onChange={(value) => {
              setVisibleItemCount(value);
            }}
          />
        </div>

        {/* 리스트 테이블 - 남은 영역 모두 차지 */}
        <div className="flex-1 overflow-auto mb-2 border border-bd-muted ">
          <ListTable
            headers={["header1", "header2", "header3", "header4", "header5"]}
            body={[
              { header1: 1, header2: "value2-1" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
              { header1: 2, header2: "value2-2" },
            ]}
            buttons={{
              header2: (url) => {
                router.push(`/users/${url}`);
              },
            }}
          />
        </div>

        {/* 페이지네이션 영역 */}
        <div className="h-12 flex items-center justify-center text-black gap-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
            maxVisible={5}
          />
        </div>
      </div>
    </>
  );
}
