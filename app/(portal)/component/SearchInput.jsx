"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function SearchInput({
  id,
  isLoading = false,
  isRequired = false,
  type = Input.Search,
  placeholder = "검색할 문구를 적어주세요.",
  handleSearchInput = () => {},
  maxLength = 20,
  hidden = false,
  value = "",
}) {
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    setSearchText(value);
  }, []);

  const onInput = (e) => {
    let text = e.target.value;
    setSearchText(text);
    handleSearchInput(text);
  };

  return (
    <div className={`flex ${hidden ? "hidden" : ""}`}>
      <Input
        id={id}
        value={searchText}
        type={type}
        disabled={isLoading}
        status={isRequired ? "error" : null}
        placeholder={placeholder}
        onInput={onInput}
        maxLength={maxLength}
      />
    </div>
  );
}
