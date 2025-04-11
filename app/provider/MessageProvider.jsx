"use client";
import { message } from "antd";
import { createContext, useContext, useMemo } from "react";

const ToastMessageContext = createContext();

export default function ToastMessageProvider({ children }) {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = ({ type = "info", content = "", duration = 5 }) => {
    messageApi.open({ type, content, duration });
  };

  // 🎯 특정 메시지용 헬퍼
  const showPenaltyMessage = (result) => {
    let type = "";
    let content = "";

    if (result == null) {
      type = "info";
      content = "저장되지 않았습니다.";
    } else if (result) {
      type = "success";
      content = "저장 되었습니다.";
    } else {
      type = "error";
      content = "저장 실패되었습니다.";
    }

    showMessage({
      type: type,
      content: content,
    });
  };

  const contextValue = useMemo(
    () => ({ showMessage, showPenaltyMessage }),
    [messageApi]
  );

  return (
    <ToastMessageContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </ToastMessageContext.Provider>
  );
}

export function useToastMessage() {
  return useContext(ToastMessageContext);
}
