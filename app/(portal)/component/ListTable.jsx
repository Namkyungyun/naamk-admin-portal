"use client";

import { Button, Space, DatePicker, version } from "antd";

const style = {
  container: "bg-canvas",
  table: "bg-canvas border text-black",
  header: "bg-subtle border",
  body: "border",
};

export function ListTable({ headers, body }) {
  return (
    <div className={`overflow-x-auto ${style.container}`}>
      <table className={`min-w-full table-auto ${style.table}`}>
        <ListTableHeader headers={headers} />
        <ListTableBody headers={headers} body={body} />
      </table>
    </div>
  );
}

export function ListTableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {/* 테이블 헤더 생성 */}
        {headers.map((header, index) => (
          <th
            key={index}
            className={`px-4 py-2 border-b text-left ${style.header}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function ListTableBody({ headers, body }) {
  if (body == null || body === undefined) {
    return (
      <div className="text-center my-10 bg-disabled">
        <p>데이터 조회에 실패하였습니다.</p>
      </div>
    );
  }

  return (
    <tbody>
      {/* 테이블 바디 생성 */}
      {body.map((row, rowIndex) => (
        <tr key={rowIndex} className={`${style.body}`}>
          {headers.map((header, colIndex) => (
            <td key={colIndex} className={`px-4 py-2 border-b ${style.body}`}>
              {row[header]}
            </td> // 데이터가 header 이름과 일치한다고 가정
          ))}
        </tr>
      ))}
    </tbody>
  );
}
