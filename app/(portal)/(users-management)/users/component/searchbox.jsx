"use client";

import { useState, useEffect } from "react";

import { RowFor3Column } from "@/app/(portal)/component/Row";
import { MDColumn } from "@/app/(portal)/component/Column";
import { SearchInput } from "@/app/(portal)/component/SearchInput";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { RangeDatePicker } from "@/app/(portal)/component/DatePicker";
import { ResetButton, SearchButton } from "@/app/(portal)/component/Buttons";

export default function UserSearchBox({
  loading,
  fetched,
  fetchedSearchData,
  onSearch,
}) {
  const [reset, setReset] = useState(false);

  /// search option list
  const [userStatusOptions, setUserStatusOptions] = useState([]);
  const [penaltyStatusOptions, setPenaltyStatusOptions] = useState([]);

  /// search data list
  const [userStatus, setUserStatus] = useState(null);
  const [penaltyStatus, setPenaltyStatus] = useState(null);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  /// required search data
  const [enabledDates, setEnabledDates] = useState();

  /// init
  useEffect(() => {}, []);

  /// rebuild
  useEffect(() => {
    if (fetched) {
      setUserStatusOptions(fetchedSearchData.userStatus);
      setPenaltyStatusOptions(fetchedSearchData.penaltyStatus);
      console.log(fetchedSearchData);
    }

    if (reset) {
      console.log("todo reset");
    }
  }, [reset, fetched]);

  const onClickSearch = () => {
    const searchData = {
      userStatus: userStatus,
      penaltyStatus: penaltyStatus,
      dates: dates,
      userId: userId,
      userName: userName,
      email: email,
    };

    if (validateSearch()) {
      onSearch(searchData);
    }
  };

  const onClickReset = (isReset) => {
    setReset(isReset);
    console.log(email);
  };

  const validateSearch = () => {
    return true;
  };

  return (
    <>
      <section className="border border-bd-muted text-white p-1 flex-grow w-full my-1">
        <RowFor3Column>
          <MDColumn title="계정 상태">
            <SelectBox
              isReset={reset}
              isFetched={fetched}
              disabled={loading}
              useAllOption={true}
              onChange={setUserStatus}
              optionData={userStatusOptions}
            />
          </MDColumn>

          <MDColumn title="제재 상태">
            <SelectBox
              isReset={reset}
              isFetched={fetched}
              disabled={loading}
              useAllOption={true}
              onChange={setPenaltyStatus}
              optionData={penaltyStatusOptions}
            />
          </MDColumn>

          <MDColumn title="가입 기간">
            <RangeDatePicker
              isReset={reset}
              useDefault={false}
              isRequired={enabledDates}
              defaultPeriod={6}
              maxPeriod={13}
              onCallback={(value) => {
                setEnabledDates(!value.result);
                setDates({
                  startDate: value.startDate,
                  endDate: value.endDate,
                });
              }}
            />
          </MDColumn>
          {/* {/* </div> */}
        </RowFor3Column>

        {/* 로우 */}
        <RowFor3Column>
          <MDColumn title="회원ID">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              hidden={false}
              placeholder={"회원 ID를 입력하세요."}
              value={userId}
              onChange={(obj) => {
                setUserId(obj.text);
              }}
            />
          </MDColumn>
          <MDColumn title="사용자명">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              hidden={false}
              placeholder={"사용자명을 입력하세요"}
              value={userName}
              onChange={(obj) => {
                setUserName(obj.text);
              }}
            />
          </MDColumn>
          <MDColumn title="이메일">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={false}
              hidden={false}
              placeholder={"이메일을 입력하세요"}
              value={email}
              onChange={(obj) => {
                console.log(obj);
                setEmail(obj.text);
              }}
            />
          </MDColumn>
        </RowFor3Column>

        <div className="flex justify-center">
          <ResetButton disabled={false} onClick={onClickReset} />
          <SearchButton disabled={false} onClick={onClickSearch} />
        </div>
      </section>
    </>
  );
}
