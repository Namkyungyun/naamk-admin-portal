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
      content = "(TP)신고 처리취소";
    } else if (result) {
      type = "success";
      content = "(TP)신고 처리완료";
    } else {
      type = "error";
      content = "(TP)신고 처리실패";
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
