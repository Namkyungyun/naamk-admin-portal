"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function SearchInput({
  value = null,
  isReset = false,
  isLoading = false,
  isRequired = false,
  type = Input.Search,
  placeholder = "검색할 문구를 적어주세요.",
  hidden = false,
  maxLength = 50,
  isNotValid,
  onChange,
  onClear,
}) {
  const [text, setText] = useState(null);

  ///// init
  useEffect(() => {
    setText(value);
  }, []);

  //// isReset에 읭한 rebuild
  useEffect(() => {
    if (isReset) {
      onClearValue();
    }
  }, [isReset]);

  /////
  const onChangeValue = (e) => {
    let text = e.target.value;
    text = text === "" ? null : text;

    setText(text);
    onChange(text);
  };

  const onClearValue = () => {
    setText(null);
    onChange(null);
    onClear?.();
  };

  return (
    <div className={`flex ${hidden ? "hidden" : ""}`}>
      <Input
        allowClear
        value={text}
        type={type}
        disabled={isLoading}
        status={isRequired && (!text || isNotValid?.(text)) ? "error" : ""}
        placeholder={placeholder}
        onClear={onClearValue}
        onChange={onChangeValue}
        maxLength={maxLength}
      />
    </div>
  );
}
