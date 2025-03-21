import { VideoCall } from "../ToolbarIcons";
import { useRef } from "react";

export function Video({ style, editor, fileManagement }) {
  if (!editor) {
    return null;
  }

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoUpload = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    Array.from(files).forEach((file) => {
      // 📌 고유 ID == shorcutUrl
      const id = fileManagement.generateShortcutUrl();
      const blobUrl = fileManagement.generateBlobUrl(file);

      // 맵에 저장 (ID - URL 매핑)
      fileManagement.setBlobUrlObject(id, blobUrl);
      fileManagement.setReqFiles(id, file);

      // input은 비우기
      fileInputRef.current.value = null;

      // 📌 TipTap에 비디오 삽입 (ID 포함)
      editor.chain().focus().setVideo({ id, src: blobUrl }).run();
    });
  };

  return (
    <div>
      <VideoCall
        style={editor.isActive("video") ? style.active : style.default}
        onClick={handleClick}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={handleVideoUpload}
      />
    </div>
  );
}
