"use client";

import { Select } from "antd";
import { useState, useEffect } from "react";

const optionOfAll = { id: 0, value: "all", label: "전체" };

export function SelectBox({
  isReset = false,
  isFetched = false,
  disabled = false,
  useAllOption = true,
  useDefault = true,
  defaultIndex = 0,
  optionData = [],
  onChange,
}) {
  const [options, setOptions] = useState(null);
  const [selectedValue, setSelectValue] = useState(null);

  /// init
  useEffect(() => {
    const list = fetchOptionList();
    setOptions(list);
    fetchOption(list);
  }, []);

  /// rebuild (api fetch된 후)
  useEffect(() => {
    if (isFetched && optionData.length > 0) {
      const list = fetchOptionList();
      setOptions(list);
      fetchOption(list);
    }
  }, [isFetched, optionData.length]);

  useEffect(() => {
    if (isReset) {
      fetchOption();
    }
  }, [isReset]);

  const fetchOption = (list) => {
    list = list ?? optionData;

    if (useDefault || useAllOption) {
      const selected = list[useDefault ? defaultIndex : 0];
      if (selected) {
        setSelectValue(selected.label); // ✅ 이게 핵심
        onChangeOption(selected.value);
      }
    } else {
      setSelectValue(null);
      onChangeOption(null);
    }
  };

  const fetchOptionList = () => {
    return useAllOption ? [optionOfAll, ...optionData] : [...optionData];
  };

  const onChangeOption = (val) => {
    setSelectValue(val);
    if (onChange != null) {
      onChange(val);
    }
  };

  // x축 길이 : w-xl w-lg w-md w-sm w-xs w-2xs w-3xs
  return (
    <>
      <div className="flex">
        <Select
          placeholder="선택"
          value={selectedValue}
          style={{
            flex: 1,
          }}
          onChange={onChangeOption}
          disabled={disabled}
          options={options}
        />
      </div>
    </>
  );
}
