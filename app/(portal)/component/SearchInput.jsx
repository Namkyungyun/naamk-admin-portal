"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function SearchInput({
  id,
  isLoading = false,
  isRequired = false,
  type = Input.Search,
  placeholder = "검색할 문구를 적어주세요.",
  maxLength = 20,
  hidden = false,
  value = "",
  handleInput = () => {},
}) {
  const [text, setText] = useState(null);
  const [validation, setValidation] = useState(true);

  useEffect(() => {
    setText(value);
  }, []);

  const onChange = (e) => {
    let text = e.target.value;

    /// validation[정규식] 들어갈 내용
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
    <div className={`my-2 flex ${hidden ? "hidden" : ""}`}>
      <Input
        id={id}
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
