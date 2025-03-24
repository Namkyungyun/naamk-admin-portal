"use client";
import editorFile from "@/app/lib/editorFile";
import { useEffect, useState } from "react";
import { CancelButton, SaveButton } from "../component/Buttons";
import Editor from "@/app/components/editor/Editor";

export default function EditorPage() {
  const fileManagement = editorFile();
  const [exportHtml, setExportHtml] = useState(false);

  const onSave = () => {
    setExportHtml(true);

    setTimeout(() => {
      setExportHtml(false);
    }, "500");
  };

  // 전처리
  const onExportPreFilter = (editor) => {
    const html = editor.getHTML();
    // 리소스 데이터 필터링
    const blobUrlObject = fileManagement.blobUrlObject;

    for (let key of Object.keys(blobUrlObject)) {
      let contain = html.includes(key);
      if (!contain) {
        delete blobUrlObject[key];
      }
    }

    // s3 url 받아오기 (API)
    // ,,,
    const s3Urls = {
      test: "https://web3-dev.s3.ap-northeast-2.amazonaws.com/poplus/test",
    };

    // editor에 새로 반영하기
    updateMediaSrc(editor, (src, node) => {
      if (node.attrs?.id !== null || node.attrs?.id !== undefined) {
        return s3Urls[node.attrs?.id];
      }
      return src;
    });
  };

  function updateMediaSrc(editor, updateSrcCallback) {
    const content = editor.getJSON();

    const updated = {
      ...content,
      content: content.content.map((node) => {
        // 블록 레벨 노드 내부까지 내려가기 (예: paragraph 안의 image)
        if (node.content) {
          return {
            ...node,
            content: node.content.map((child) => {
              if (
                (child.type === "image" || child.type === "video") &&
                child.attrs?.src
              ) {
                return {
                  ...child,
                  attrs: {
                    ...child.attrs,
                    src: updateSrcCallback(child.attrs.src, child), // 콜백으로 변경
                  },
                };
              }
              return child;
            }),
          };
        }

        // 직접 노드 자체가 image/video인 경우
        if (
          (node.type === "image" || node.type === "video") &&
          node.attrs?.src
        ) {
          return {
            ...node,
            attrs: {
              ...node.attrs,
              src: updateSrcCallback(node.attrs.src, node),
            },
          };
        }

        return node;
      }),
    };

    editor.commands.setContent(updated);
  }

  const onExportAfterFilter = (editor) => {
    const html = editor.getHTML();
    console.log(html);
  };

  return (
    <section className="border text-black p-6 rounded-lg flex-grow w-full my-10">
      {/* title  */}
      <div>
        <label className="text-lg font-bold"> Title </label>
        <input
          className="rounded-lg border border-bd-muted w-full py-2 px-2"
          id="title"
          type="string"
        />
      </div>
      <div className="py-3" />
      {/* content */}
      <div>
        <label className="text-lg font-bold">Content</label>
        <Editor
          fileManagement={fileManagement}
          exportHtml={exportHtml}
          onExportPreFilter={(html) => onExportPreFilter(html)}
          onExportAfterFilter={(html) => onExportAfterFilter(html)}
          className="rounded-lg border border-bd-muted px-2 py-8"
        />
      </div>

      {/* buttons */}
      <div className="flex justify-end">
        <CancelButton />
        <SaveButton onClick={() => onSave()} />
      </div>
    </section>
  );
}
