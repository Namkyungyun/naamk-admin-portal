"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function LimitedLengthTextArea({
  isReset = false,
  disabled = false,
  readOnly = false,
  isRequired = false,
  placeholder = "text area...",
  minLength = 20,
  maxLength = 100,
  value,
  onChange,
}) {
  const { TextArea } = Input;
  const [text, setText] = useState("");
  const [validation, setValidation] = useState(true);

  useEffect(() => {
    setText(value);
  }, []);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isReset) {
      setText(null);
    }
  }, [isReset]);

  const onInput = (e) => {
    let text = e.target.value ?? "";

    let validation = minLength <= text.length;

    setText(text);
    setValidation(validation);

    onChange({
      result: validation,
      text: text,
    });
  };

  const onClear = () => {
    setText("");
    setValidation(true);
  };

  return (
    <div className={`py-1 h-full`}>
      <TextArea
        // showCount
        allowClear
        onClear={onClear}
        autoSize={false}
        disabled={disabled}
        readOnly={readOnly}
        status={isRequired || (text && !validation) ? "error" : ""}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        style={{
          height: "100%",
          resize: "none",
        }}
        value={text}
        onChange={onInput}
      />
    </div>
  );
}
