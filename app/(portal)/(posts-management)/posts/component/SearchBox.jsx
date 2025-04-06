"use client";

import { useState, useEffect } from "react";

import { RowFor2Column } from "@/app/(portal)/component/Row";
import { MDColumn } from "@/app/(portal)/component/Column";
import { SearchInput } from "@/app/(portal)/component/SearchInput";
import { SelectBox } from "@/app/(portal)/component/SelectBox";
import { RangeDatePicker } from "@/app/(portal)/component/DatePicker";
import { ResetButton, SearchButton } from "@/app/(portal)/component/Buttons";

export default function PostsSearchBox({
  loading,
  fetched,
  fetchedSearchData,
  onSearch,
}) {
  const [reset, setReset] = useState(false);

  /// search option list
  const [penaltyStatusOptions, setPenaltyStatusOptions] = useState([]);

  /// search data list
  // 제재상태
  const [penaltyStatus, setPenaltyStatus] = useState(null);
  // 채널ID
  const [channelName, setChannelName] = useState(null);
  // 작성자ID
  const [userName, setUserName] = useState(null); // 처리자
  // 최근신고기간
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  /// required search data (모두 항상 false 여야 함)
  const [requiredSearchData, setRequiredSearchData] = useState({
    channelName: {
      required: false,
      isNotValid: (text) => !text || text?.length < 2,
    },
    userName: {
      required: false,
      isNotValid: (text) => !text || text?.length < 2,
    },
  });

  const onClickReset = (isReset) => {
    const channelNameSearch = onResetRequired("channelName");
    const userNameSearch = onResetRequired("userName");
    const newRequiredSearchData = { ...channelNameSearch, ...userNameSearch };

    setRequiredSearchData(newRequiredSearchData);
    setReset(isReset);
  };

  const onClickSearch = () => {
    const searchData = {
      penaltyStatus: penaltyStatus == "all" ? null : penaltyStatus,
      startDate: dates.startDate,
      endDate: dates.endDate,
      channelName: channelName,
      userName: userName,
    };

    if (validateSearch()) {
      onSearch(searchData);
    }
  };

  const validateSearch = () => {
    const channelNameSearch = onValidateRequired("channelName", channelName);
    const userNameSearch = onValidateRequired("userName", userName);
    const newRequiredSearchData = { ...channelNameSearch, ...userNameSearch };

    setRequiredSearchData(newRequiredSearchData);
    return !Object.values(newRequiredSearchData)
      .map((el) => el.required)
      .includes(true);
  };

  const onResetRequired = (key) => {
    const updated = requiredSearchData[key];
    updated.required = false;

    const obj = {};
    obj[key] = updated;
    return obj;
  };

  const onValidateRequired = (key, value) => {
    const updated = { ...requiredSearchData[key] };
    updated.required = updated.isNotValid(value);

    const obj = {};
    obj[key] = updated;
    return obj;
  };

  /// init render
  useEffect(() => {}, []);

  /// rebuild render
  useEffect(() => {
    if (!reset && fetched) {
      setPenaltyStatusOptions(fetchedSearchData?.penaltyStatus);
    }

    if (reset) {
      console.log("reseted");
    }
  }, [reset, fetched]);

  return (
    <>
      <section className="border border-bd-disabled p-1 flex-grow w-full my-1">
        <RowFor2Column>
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

          <MDColumn title="등록 기간">
            <RangeDatePicker
              isReset={reset}
              useDefault={false}
              isRequired={false}
              defaultPeriod={365}
              maxPeriod={365}
              onCallback={(value) => {
                setDates({
                  startDate: value.startDate,
                  endDate: value.endDate,
                });
              }}
            />
          </MDColumn>
        </RowFor2Column>

        <RowFor2Column>
          <MDColumn title="작성자ID*">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={requiredSearchData.userName.required}
              isNotValid={requiredSearchData.userName.isNotValid}
              placeholder={"글을 작성한 회원 ID를 입력하세요."}
              value={userName}
              onChange={setUserName}
              onClear={() => onResetRequired("userName")}
            />
          </MDColumn>
          <MDColumn title="채널ID*">
            <SearchInput
              isReset={reset}
              isLoading={loading}
              isRequired={requiredSearchData.channelName.required}
              isNotValid={requiredSearchData.channelName.isNotValid}
              placeholder={"글이 등록된 채널 ID를 입력하세요."}
              value={channelName}
              onChange={setChannelName}
              onClear={() => onResetRequired("channelName")}
            />
          </MDColumn>
        </RowFor2Column>

        <div className="flex justify-center">
          <ResetButton disabled={loading} onClick={onClickReset} />
          <SearchButton disabled={loading} onClick={onClickSearch} />
        </div>
      </section>
    </>
  );
}
