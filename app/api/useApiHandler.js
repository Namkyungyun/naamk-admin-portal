"use client";

import { useToastMessage } from "@/app/provider/MessageProvider";
import { useRouter } from "next/navigation";

export function useClientApiHandler() {
  const { showMessage } = useToastMessage();
  const router = useRouter();

  const withClientApiHandler = ({handler, init, then, beforeCatch, final, toLogin}) => {
    const unAuthorizedException= (message) => {
      showMessage({
        type: "error",
        content: message + " : 인증되지 않았습니다.",
      });
      router.replace("/login");
    };

    const accessDeniedException= (message) => {
      showMessage({
        type: "error",
        content: message + " : 접근 권한이 없습니다.",
      });
    };

    const internalServerException= (message) => {
      showMessage({
        type: "error",
        content: message,
      });
    };

    return async function (req, context) {
      init?.();

      try {
        const res = await handler(req, context);

        if (!res.ok) {
          const status = res.status;
          const errorData = await res.json();

          if (status === 401) { // 인증안됨.
            unAuthorizedException(errorData.message);
            return;

          } else if (status === 403) {  // 권한없음
            accessDeniedException(errorData.message);
            return;

          } else if (status === 500) {
            internalServerException(errorData.message);
            return;
          }

          showMessage({
            type: "error",
            content: errorData?.message || "처리 중 오류가 발생했습니다.",
          });
          return;
        }

        const result = await res.json();
        const header = result.header;
        const body = result.body;

        let catchResult = null;
        if(beforeCatch != null) {
          catchResult = beforeCatch(header.resultCode, header.resultMessage);
        }

        if(catchResult == null) {
          return then?.(body.entity); // callback으로 결과 전달
        }

      } catch (err) {
        console.error("[withClientApiHandler] error:", err);
        showMessage({
          type: "error",
          content: "네트워크 오류가 발생했습니다.",
        });
      } finally {
        if(toLogin) {
          router.replace("/login");
          return;
        }
        final?.();
      }
    };
  };

  return { withClientApiHandler };
}
