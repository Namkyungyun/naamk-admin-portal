"use client";

import { useState, useEffect } from "react";

import { RowFor3Column } from "@/app/(portal)/component/Row";
import { FullColumn, MDColumn } from "@/app/(portal)/component/Column";
import { SearchInput } from "@/app/(portal)/component/SearchInput";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { RangeDatePicker } from "@/app/(portal)/component/DatePicker";
import { ResetButton, SearchButton } from "@/app/(portal)/component/Buttons";

export default function UserReportSearchBox({
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
  // 대상자ID
  const [reportedName, setReportedName] = useState(null);
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
      reportedName: reportedName,
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
      <section className="border border-bd-muted p-1 flex-grow w-full my-1">
        <RowFor3Column>
          <MDColumn title="신고 상태">
            <SelectBox
              isReset={reset}
              isFetched={fetched}
              disabled={loading}
              useAllOption={true}
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
          <MDColumn title="대상자ID">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              placeholder={"회원 ID를 입력하세요."}
              value={reportedName}
              onChange={setReportedName}
            />
          </MDColumn>
          <FullColumn title="처리자">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              placeholder={"처리자ID 입력하세요"}
              value={penaltyCreatedBy}
              onChange={setPenaltyCreatedBy}
            />
          </FullColumn>
        </RowFor3Column>

        <div className="flex justify-center">
          <ResetButton disabled={loading} onClick={onClickReset} />
          <SearchButton disabled={loading} onClick={onClickSearch} />
        </div>
      </section>
    </>
  );
}
