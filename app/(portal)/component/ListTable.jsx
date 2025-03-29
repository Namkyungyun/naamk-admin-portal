"use client";

import { SelectBox } from "./SelectBox";

const style = {
  container: "bg-canvas",
  table: "bg-canvas border text-black",
  header: "bg-disabled border text-sm text-center ",
  body: "border text-sm text-center",
};

export function ListTable({ headers, body }) {
  if (!headers) {
    return null;
  }

  return (
    <div className="overflow-x-auto bg-canvas">
      <table className={`min-w-full table-auto bg-canvas border text-black`}>
        <ListTableHeader headers={headers} />

        {body.length !== 0 ? (
          <ListTableBody headers={headers} body={body} />
        ) : null}
      </table>

      {body.length !== 0 ? null : (
        <div className="text-gray-500 w-full text-center text-sm items-center mt-30">
          조회된 데이터가 없습니다.
        </div>
      )}
    </div>
  );
}

export function ListTableHeader({ headers }) {
  if (!headers) {
    return null;
  }
  return (
    <thead>
      <tr>
        {/* 테이블 헤더 생성 */}
        {headers.map((header, index) => (
          <th
            key={index}
            className={`px-2 py-2 border-b ${style.header} ${header.hidden ? "hidden" : ""}`}
          >
            {header.variableLabel}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function ListTableBody({ headers, body }) {
  return (
    <tbody>
      {/* 테이블 바디 생성 */}
      {body.map((row, rowIndex) => (
        <tr key={rowIndex} className={`${style.body}`}>
          {headers.map((header, colIndex) => {
            const headerName = header.variableName;
            const isButton = header.onButton != null;
            const urlHeaderName = header.url;
            const urlValue = row[urlHeaderName];

            let children = null;

            if (isButton) {
              const onClick = () => header.onButton(urlValue);
              const type = `${typeof row[headerName]}`;

              if (type === "boolean") {
                children = row[headerName] ? (
                  <button className="underline" onClick={onClick}>
                    보기
                  </button>
                ) : (
                  <span>-</span>
                );
              } else {
                children = (
                  <button className="underline" onClick={onClick}>
                    {row[headerName]}
                  </button>
                );
              }
            } else {
              children = <span>{row[headerName]}</span>;
            }

            return (
              <td
                key={colIndex}
                className={`px-2 py-1 border-b ${style.body} ${header.hidden ? "hidden" : ""}`}
              >
                {children}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export function ListCount({
  totalItemCount,
  defaultIndex,
  optionData = [],
  onChange,
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm">총 {totalItemCount}개</span>
        |
        <SelectBox
          useAllOption={false}
          useDefault={true}
          defaultIndex={defaultIndex}
          onChange={onChange}
          optionData={optionData}
        />
      </div>
    </>
  );
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  maxVisible = 10,
}) {
  const createPageRange = () => {
    const pageList = [];

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pageList.push(i);
    }

    return pageList;
  };

  const pages = createPageRange();

  return (
    <div className="flex items-center justify-center gap-1 py-2 text-sm text-gray-800">
      {/* ◀◀ 처음 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-1 py-1 hover:text-black disabled:text-gray-300"
      >
        ◀◀
      </button>

      {/* ◀ 이전 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-1 py-1 hover:text-black disabled:text-gray-300"
      >
        ◀
      </button>

      {/* 페이지 숫자 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded ${
            page === currentPage
              ? "text-sky-500 font-bold underline"
              : "hover:text-black"
          }`}
        >
          {page}
        </button>
      ))}

      {/* ▶ 다음 */}
      <button
        onClick={() => onPageChange(currentPage + maxVisible)}
        disabled={currentPage === totalPages}
        className="px-1 py-1 hover:text-black disabled:text-gray-300"
      >
        ▶
      </button>

      {/* ▶▶ 마지막 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-1 py-1 hover:text-black disabled:text-gray-300"
      >
        ▶▶
      </button>
    </div>
  );
}
