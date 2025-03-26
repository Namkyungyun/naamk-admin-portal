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
  minLength = 0,
  maxLength = 20,
  hidden = false,
  onChange,
}) {
  const [text, setText] = useState("");
  const [validation, setValidation] = useState(true);

  ///// init
  useEffect(() => {
    setText(value);
  }, []);

  //// isReset에 읭한 rebuild
  useEffect(() => {
    if (isReset) {
      onClear();
    }
  }, [isReset]);

  /////
  const onChangeValue = (e) => {
    let text = e.target.value;
    let validation = onValidate(text);

    setText(text);
    setValidation(validation);

    onChange({
      result: validation,
      text: text,
    });
  };

  const onClear = () => {
    let text = "";
    let validation = onValidate(text);

    setText(text);
    setValidation(true);

    onChange({
      result: validation,
      text: text,
    });
  };

  const onValidate = (text) => {
    const valid = minLength < text.length;
    return valid;
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
        onChange={onChangeValue}
        maxLength={maxLength}
      />
    </div>
  );
}
