"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function SearchInput({
  value = "",
  isReset = false,
  isLoading = false,
  isRequired = false,
  type = Input.Search,
  placeholder = "검색할 문구를 적어주세요.",
  maxLength = 20,
  hidden = false,
  handleInput = () => {},
  handleReset = () => {},
}) {
  const [text, setText] = useState(null);
  const [validation, setValidation] = useState(true);

  ///// init
  useEffect(() => {
    setText(value);
  }, []);

  //// isReset에 읭한 rebuild
  useEffect(() => {
    if (isReset) {
      onClear();
      handleReset(false);
    }
  }, [isReset]);

  /////
  const onChange = (e) => {
    let text = e.target.value;

    /// TODO validation[정규식] 들어갈 내용
    let validation = 4 < text.length;

    setText(text);
    setValidation(validation);

    handleInput({
      result: validation,
      text: text,
    });
  };

  const onClear = () => {
    setText("");
    setValidation(true);
  };

  return (
    <div className={`flex ${hidden ? "hidden" : ""}`}>
      <Input
        allowClear
        value={text}
        type={type}
        disabled={isLoading}
        status={isRequired || (text && !validation) ? "error" : ""}
        placeholder={placeholder}
        onClear={onClear}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
