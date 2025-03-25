"use client";
import editorFile from "@/app/lib/editorFile";
import { useState } from "react";
import { CancelButton, SaveButton } from "../component/Buttons";
import Editor from "@/app/components/editor/Editor";
import exportStyles from "@/app/components/editor/export.css?inline";

export default function EditorPage() {
  const fileManagement = editorFile();
  const [exportHtml, setExportHtml] = useState(false);
  const [completedResoureUpload, setCompletedResoureceUpload] = useState(false);

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
    fileManagement.cleanUpRequestFile(html);

    // s3 url 받아오기 (API)
    const reqFiles = fileManagement.reqFiles;
    // console.log(reqFiles);
    // ,,, ///
    // const s3Urls = {
    //   test: "https://web3-dev.s3.ap-northeast-2.amazonaws.com/poplus/test",
    // };
    const s3Urls = {};

    // editor에 새로 반영하기
    let isLeakResource = false;
    const updatedContent = fileManagement.updateMediaSrc(
      // response에서 값이 있는 경우는 updateMediaSrc 연결 함수에서 reqFiles내 key값을 삭제함.
      editor,
      (src, node) => {
        if (node.attrs?.id !== null || node.attrs?.id !== undefined) {
          const s3Url = s3Urls[node.attrs?.id];
          if (!s3Url) {
            isLeakResource = true;

            return null;
          }
          return s3Url;
        }
        return src;
      }
    );

    queueMicrotask(() => {
      editor.commands.setContent(updatedContent);
      setCompletedResoureceUpload(!isLeakResource);
      console.log("isLeakResource >>>>> " + isLeakResource);
    });
  };

  const onExportAfterFilter = (editor) => {
    const html = editor.getHTML();
    // TODO : 스타일이 적용되어서 html로 나갈 수 있도록 해야 함 !!!!
    //   const htmlWithStyle = `
    //   <style>
    //     ${exportStyles}
    //   </style>
    //   <div class="tiptap-content">
    //     ${html}
    //   </div>
    // `;

    console.log(html);
    console.log("completedResoureUpload >>>>> " + completedResoureUpload);
    if (!completedResoureUpload) {
      alert("일부 리소스가 저장에 실패하였습니다!");
      return;
    }

    /// TODO : form에 담을 thumnail 값 추출

    /// TODO : 본문 저장 API 호출
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
