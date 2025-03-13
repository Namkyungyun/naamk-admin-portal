"use client";

import { Select } from "antd";
import { useState, useEffect } from "react";

const optionOfAll = { id: 0, value: "all", label: "전체" };

export function SelectBox({
  userAllOption = true,
  useDefault = true,
  defaultIndex = 0,
  disabled = false,
  optionData = [],
  handleChange = () => {},
}) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectValue] = useState(null);

  /// init
  useEffect(() => {
    const list = userAllOption ? [optionOfAll, ...optionData] : [...optionData];
    setOptions(list);

    if (useDefault) {
      setSelectValue(list[defaultIndex].label);
    }
  }, []);

  useEffect(() => {}, [options.length, selectedValue]);

  const onChange = (val) => {
    setSelectValue(val);
    handleChange(val);
  };

  // x축 길이 : w-xl w-lg w-md w-sm w-xs w-2xs w-3xs
  return (
    <>
      <div className="my-2 flex">
        <Select
          placeholder="선택"
          value={selectedValue}
          style={{
            flex: 1,
          }}
          onChange={onChange}
          disabled={disabled}
          options={options}
        />
      </div>
    </>
  );
}
