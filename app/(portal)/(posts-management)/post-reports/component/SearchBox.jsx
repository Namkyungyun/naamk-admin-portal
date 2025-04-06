"use client";

import { useState, useEffect } from "react";

import { RowFor3Column } from "@/app/(portal)/component/Row";
import { MDColumn } from "@/app/(portal)/component/Column";
import { SearchInput } from "@/app/(portal)/component/SearchInput";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { RangeDatePicker } from "@/app/(portal)/component/DatePicker";
import { ResetButton, SearchButton } from "@/app/(portal)/component/Buttons";

export default function PostReportSearchBox({
  loading,
  fetched,
  fetchedSearchData,
  onSearch,
}) {
  const [reset, setReset] = useState(false);

  /// search option list
  const [reportStatusOptions, setReportStatusOptions] = useState([]);
  const [penaltyStatusOptions, setPenaltyStatusOptions] = useState([]);

  /// search data list
  // 신고상태
  const [reportStatus, setReportStatus] = useState(null);
  // 처리상태
  const [penaltyStatus, setPenaltyStatus] = useState(null);
  // 작성자ID
  const [reportedUserName, setReportedUserName] = useState(null);
  // 채널ID
  const [reportedChannelName, setReportedChannelName] = useState(null);
  // 처리자
  const [penaltyCreatedBy, setPenaltyCreatedBy] = useState(null); // 처리자
  // 최근신고기간
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  /// init render
  useEffect(() => {}, []);

  /// rebuild render
  useEffect(() => {
    if (!reset && fetched) {
      setReportStatusOptions(fetchedSearchData?.reportStatus);
      setPenaltyStatusOptions(fetchedSearchData?.penaltyStatus);
    }

    if (reset) {
      console.log("reseted");
    }
  }, [reset, fetched]);

  const onClickSearch = () => {
    const searchData = {
      reportStatus: reportStatus == "all" ? null : reportStatus,
      penaltyStatus: penaltyStatus == "all" ? null : penaltyStatus,
      startDate: dates.startDate,
      endDate: dates.endDate,
      reportedName: reportedUserName,
      penaltyCreatedBy: penaltyCreatedBy,
    };

    if (validateSearch()) {
      onSearch(searchData);
    }
  };

  const onClickReset = (isReset) => {
    setReset(isReset);
  };

  const validateSearch = () => {
    return true;
  };

  return (
    <>
      <section className="border border-bd-disabled p-1 flex-grow w-full my-1">
        <RowFor3Column>
          <MDColumn title="신고 상태">
            <SelectBox
              isReset={reset}
              isFetched={fetched}
              disabled={loading}
              useAllOption={true}
              useDefault={true}
              // defaultIndex={}
              onChange={setReportStatus}
              optionData={reportStatusOptions}
            />
          </MDColumn>

          <MDColumn title="처리 상태">
            <SelectBox
              isReset={reset}
              isFetched={fetched}
              disabled={loading}
              useAllOption={true}
              onChange={setPenaltyStatus}
              optionData={penaltyStatusOptions}
            />
          </MDColumn>

          <MDColumn title="최근 신고 기간">
            <RangeDatePicker
              isReset={reset}
              useDefault={false}
              isRequired={false}
              defaultPeriod={365 * 3}
              maxPeriod={365 * 3}
              onCallback={(value) => {
                setDates({
                  startDate: value.startDate,
                  endDate: value.endDate,
                });
              }}
            />
          </MDColumn>
        </RowFor3Column>
        <RowFor3Column>
          <MDColumn title="작성자ID">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              placeholder={"글을 작성한 회원 ID를 입력하세요."}
              value={reportedUserName}
              onChange={setReportedUserName}
            />
          </MDColumn>
          <MDColumn title="채널ID">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              placeholder={"글이 등록된 채널 ID를 입력하세요."}
              value={reportedChannelName}
              onChange={setReportedChannelName}
            />
          </MDColumn>
          <MDColumn title="처리자">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              placeholder={"처리자 ID 입력하세요"}
              value={penaltyCreatedBy}
              onChange={setPenaltyCreatedBy}
            />
          </MDColumn>
        </RowFor3Column>

        <div className="flex justify-center">
          <ResetButton disabled={loading} onClick={onClickReset} />
          <SearchButton disabled={loading} onClick={onClickSearch} />
        </div>
      </section>
    </>
  );
}
