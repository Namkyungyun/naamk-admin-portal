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

    if (useDefault) {
      setSelectValue(list[defaultIndex]?.label);
      onChangeOption(list[defaultIndex]?.value);
    }
  }, []);

  /// rebuild (api fetch된 후)
  useEffect(() => {
    if (isFetched) {
      setOptions([]);

      const list = fetchOptionList();
      setOptions(list);
      setSelectValue(list[defaultIndex]?.label);
      onChangeOption(list[defaultIndex]?.value);
    }
  }, [isFetched, optionData.length]);

  useEffect(() => {
    if (isReset) {
      let index = useDefault ? defaultIndex : 0;

      setSelectValue(options[index]?.label);
      onChangeOption(options[index]?.value);
    }
  }, [isReset]);

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
