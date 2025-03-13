"use client";
import { Input } from "antd";
import { useState, useEffect } from "react";

export function LimitedLengthTextArea({
  isLoading = false,
  readOnly = false,
  isRequired = false,
  placeholder = "text area...",
  minLength = 20,
  maxLength = 100,
  value = "",
  handleTextArea = () => {},
}) {
  const { TextArea } = Input;
  const [text, setText] = useState("");
  const [validation, setValidation] = useState(true);

  useEffect(() => {
    setText(value);
  }, []);

  const onInput = (e) => {
    let text = e.target.value ?? "";

    let validation = minLength < text.length;

    setText(text);
    setValidation(validation);

    handleTextArea({
      result: validation,
      text: text,
    });
  };

  const onClear = () => {
    setText("");
    setValidation(true);
  };

  return (
    <div className={`my-2 flex`}>
      <TextArea
        showCount
        allowClear
        onClear={onClear}
        autoSize={false}
        disabled={isLoading}
        readOnly={readOnly}
        status={isRequired || (text && !validation) ? "error" : ""}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        style={{
          height: 180,
          resize: "none",
        }}
        value={text}
        onChange={onInput}
      />
    </div>
  );
}
