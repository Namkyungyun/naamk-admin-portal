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

  useEffect(() => { }, []);

  return (
    <div>
      {/* 제목 & 설명 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">
          제목이랑 설명이 들어갈 영역
        </p>
        {/* ///// */}
        <div className="flex justify-end">
          <SaveButton
            disabled={false}
            onClick={() => {
              setReset(true);
            }}
          />
          <UpdateButton disabled={false} onClick={() => { }} />
          <ConfirmButton disabled={false} onClick={() => { }} />
          <CancelButton disabled={false} onClick={() => { }} />
          <DeleteButton disabled={false} onClick={() => { }} />
          <DownloadButton disabled={false} prefix="엑셀" onClick={() => { }} />
        </div>
      </section>

      {/* 검색 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">
          검색 모형
        </p>
        <form>
          {/* 로우 */}
          <div className="grid grid-cols-9 bg-canvas">
            {/* 칼럼 */}
            <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
              <div className="col-span-1 bg-brand-50 text-center">
                <label className="text-black text-sm font-semibold leading-9">상태1</label>
              </div>
              <div className="mx-1 col-span-2 content-center">
                <SelectBox
                  userAllOption={true}
                  handleChange={(value) => {
                    console.log(value);
                  }}
                  optionData={[{ id: 1, value: "value1", label: "선택1" }]}
                />
              </div>
            </div>

            {/* 칼럼 */}
            <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
              <div className="col-span-1 bg-brand-50 text-center">
                <label className="text-black text-sm font-semibold leading-9">상태2</label>
              </div>
              <div className="mx-1 col-span-2 content-center">
                <SelectBox
                  userAllOption={true}
                  handleChange={(value) => {
                    console.log(value);
                  }}
                  optionData={[{ id: 1, value: "value1", label: "선택1" }]}
                />
              </div>
            </div>

            {/* 칼럼 */}
            <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
              <div className="col-span-1 bg-brand-50 text-center">
                <label className="text-black text-sm font-semibold leading-9">상태1</label>
              </div>
              <div className="mx-1 col-span-2 content-center">
                <RangeDatePicker
                  isRequired={completedDate}
                  defaultPeriod={6}
                  maxPeriod={13}
                  handleDates={(value) => {
                    setCompletedDate(!value.result);
                  }}
                />
              </div>
            </div>
          </div>

          {/* 로우 */}
          <div className="grid grid-cols-9 bg-canvas">
            {/* 칼럼 */}
            <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
              <div className="col-span-1 bg-brand-50 text-center">
                <label className="text-black text-sm font-semibold leading-9">검색어1</label>
              </div>
              <div className="mx-1 col-span-2 content-center">
                <SearchInput
                  isReset={reset}
                  isLoading={false}
                  isRequired={false}
                  hidden={false}
                  placeholder={"회원 ID를 입력하세요."}
                  value={""}
                  handleInput={(obj) => { }}
                  handleReset={(val) => {
                    setReset(val);
                  }}
                />
              </div>
            </div>

            {/* 칼럼 */}
            <div className="flex col-span-6 grid grid-cols-6 border border-bd-subtle">
              <div className="col-span-1 bg-brand-50 text-center">
                <label className="text-black text-sm font-semibold leading-9">검색어2</label>
              </div>
              <div className="mx-1 col-span-5 content-center">
                <SearchInput
                  isReset={reset}
                  isLoading={false}
                  isRequired={false}
                  hidden={false}
                  placeholder={"회원 ID를 입력하세요."}
                  value={""}
                  handleInput={(obj) => { }}
                  handleReset={(val) => {
                    setReset(val);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* 상세페이지 표 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">
          상세페이지 표 (2 colum)
        </p>
        {/* 로우 */}
        <div className="grid grid-cols-6 bg-canvas">
          {/* 칼럼 */}
          <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
            <div className="col-span-1 bg-brand-50 text-center">
              <label className="text-black text-sm font-semibold leading-9">variable name</label>
            </div>
            <div className="mx-1 col-span-2 content-center">
              값
            </div>
          </div>

          {/* 칼럼 */}
          <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
            <div className="col-span-1 bg-brand-50 text-center">
              <label className="text-black text-sm font-semibold leading-9">variable name</label>
            </div>
            <div className="mx-1 col-span-2 content-center">
              값
            </div>
          </div>
        </div>

        {/* 로우 */}
        <div className="grid grid-cols-6 bg-canvas">
          {/* 칼럼 */}
          <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
            <div className="col-span-1 bg-brand-50 text-center">
              <label className="text-black text-sm font-semibold leading-9">variable name</label>
            </div>
            <div className="mx-1 col-span-2 content-center">
              값
            </div>
          </div>

          {/* 칼럼 */}
          <div className="flex col-span-3 grid grid-cols-3 border border-bd-subtle">
            <div className="col-span-1 bg-brand-50 text-center">
              <label className="text-black text-sm font-semibold leading-9">variable name</label>
            </div>
            <div className="mx-1 col-span-2 content-center">
              값
            </div>
          </div>
        </div>
      </section>

      {/* 표 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">
          검색 결과 표
        </p>
        <ListTable
          headers={["header1", "header2", "header3", "header4", "header5"]}
          body={[
            { header1: "value1-1 of header1", header2: "value2-1 of header2" },
            { header1: "value1-2 of header1", header2: "value2-2 of header2" },
          ]}
        />
        <p className="text-black">
          페이지네이션이 들어갈 페이지 영역 (ex. &lt; 1 2 3 4 5 ... &gt;)
        </p>
      </section>

      {/* 컴포넌트 영역 */}
      <section className="border text-white p-6 rounded-lg flex-grow w-full my-10">
        <p className="text-black">
          컴포넌트
        </p>
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
          handleInput={(obj) => { }}
          handleReset={(val) => {
            setReset(val);
          }}
        />

        <LimitedLengthTextArea
          readOnly={false}
          isRequired={false}
          placeholder={"Custom TextArea Placeholder"}
          value={""}
          handleTextArea={(obj) => { }}
        />
      </section>
    </div>
  );
};

export default Test;
