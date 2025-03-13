"use client";

import { useState, useEffect } from "react";

import {
  SaveButton,
  UpdateButton,
  DeleteButton,
  CancelButton,
  ConfirmButton,
  DownloadButton,
} from "../component/Buttons";

import { ListTable } from "../component/ListTable";
import { RangeDatePicker } from "../component/DatePicker";
import { SelectBox } from "../component/SelectBox";
import { SearchInput } from "../component/SearchInput";
import { LimitedLengthTextArea } from "../component/TextArea";

const Test = () => {
  const [reset, setReset] = useState(false);
  const [completedDate, setCompletedDate] = useState();
  const [search, setSearch] = useState({
    userName: "",
  });

  useEffect(() => {}, []);

  return (
    <div>
      {/* 제목 & 설명 영역 */}
      <section className="bg-gray-300 text-white p-6 rounded-lg w-full my-10">
        제목이랑 설명이 들어갈 영역
        {/* ///// */}
        <div className="flex justify-end">
          <SaveButton
            disabled={false}
            onClick={() => {
              setReset(true);
            }}
          />
          <UpdateButton disabled={false} onClick={() => {}} />
          <ConfirmButton disabled={false} onClick={() => {}} />
          <CancelButton disabled={false} onClick={() => {}} />
          <DeleteButton disabled={false} onClick={() => {}} />
          <DownloadButton disabled={false} prefix="엑셀" onClick={() => {}} />
        </div>
      </section>

      {/* 검색 영역 */}
      <section className="bg-gray-300 text-white p-6 rounded-lg w-full my-10 h-xl">
        <RangeDatePicker
          isRequired={completedDate}
          defaultPeriod={6}
          maxPeriod={13}
          handleDates={(value) => {
            setCompletedDate(!value.result);
          }}
        />

        <SelectBox
          userAllOption={true}
          handleChange={(value) => {
            console.log(value);
          }}
          optionData={[{ id: 1, value: "value1", label: "선택1" }]}
        />

        <SearchInput
          isReset={reset}
          isLoading={false}
          isRequired={false}
          hidden={false}
          placeholder={"회원 ID를 입력하세요."}
          value={""}
          handleInput={(obj) => {}}
          handleReset={(val) => {
            setReset(val);
          }}
        />

        <LimitedLengthTextArea
          readOnly={false}
          isRequired={false}
          placeholder={"Custom TextArea Placeholder"}
          value={""}
          handleTextArea={(obj) => {}}
        />
      </section>

      {/* 표 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <ListTable
          headers={["header1", "header2", "header3", "header4", "header5"]}
          body={[
            { header1: "value1-1 of header1", header2: "value2-1 of header2" },
            { header1: "value1-2 of header1", header2: "value2-2 of header2" },
          ]}
        />
      </section>

      {/* 페이지네이션 영역 */}
      <section className="bg-gray-300 text-white p-6 rounded-lg w-full my-10">
        페이지네이션이 들어갈 페이지 영역 (ex. &lt; 1 2 3 4 5 ... &gt;)
      </section>
    </div>
  );
};

export default Test;
