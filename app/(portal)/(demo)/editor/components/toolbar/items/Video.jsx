import "@/app/components/editor/styles.scss";
import { useState, useRef } from "react";
import { VideoCall, FileUploadOutlined, LinkIcon } from "../ToolbarIcons";
import { Dropdown } from "./Dropdown";
import UrlPopup from "../UrlPopup";

export function Video({ style, editor, fileManagement }) {
  if (!editor) {
    return null;
  }
  const [closeDropdown, setCloseDropdown] = useState(false);

  const onCloseDropdown = (isClose) => {
    setCloseDropdown(isClose);

    setTimeout(() => {
      setCloseDropdown(false);
    }, "500");
  };

  const selectedItem = (
    <VideoCall
      style={editor.isActive("video") ? style.active : style.default}
    />
  );
  const items = [
    <VideoUpload
      style={style}
      editor={editor}
      fileManagement={fileManagement}
      onClose={onCloseDropdown}
    />,
    <VideoUrlUpload
      style={style}
      editor={editor}
      fileManagement={fileManagement}
      onClose={onCloseDropdown}
    />,
  ];

  return (
    <>
      <Dropdown
        closeAuto={false}
        items={items}
        selectedItem={selectedItem}
        isClose={closeDropdown}
      />
    </>
  );
}

export function VideoUpload({ style, editor, fileManagement, onClose }) {
  if (!editor) {
    return null;
  }

  const fileInputRef = useRef(null);

  /// file upload
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoUpload = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    for (let file of files) {
      // 📌 고유 ID == shorcutUrl
      const id = fileManagement.generateShortcutUrl();
      const blobUrl = fileManagement.generateBlobUrl(file);

      // 맵에 저장 (ID - URL 매핑)
      fileManagement.setBlobUrlObject(id, blobUrl);
      fileManagement.setReqFiles(id, file);

      // 📌 TipTap에 비디오 삽입 (ID 포함)
      editor
        .chain()
        .focus()
        .setVideo({ id, src: blobUrl, embedType: "video" })
        .run();
    }

    // input은 비우기
    fileInputRef.current.value = null;

    onClose(true);
  };

  return (
    <div>
      <FileUploadOutlined style={style.default} onClick={handleClick} />

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

export function VideoUrlUpload({ style, editor, fileManagement, onClose }) {
  if (!editor) {
    return null;
  }

  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const handleUrlSubmit = (url) => {
    editor
      .chain()
      .focus()
      .setVideo({ id: null, src: convertToEmbedUrl(url), embedType: "iframe" })
      .run();

    onClose(true);
  };

  const convertToEmbedUrl = (url) => {
    try {
      const ytRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/;
      const match = url.match(ytRegex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
      return url; // fallback
    } catch {
      return url;
    }
  };

  const onPopupClose = () => {
    setShowUrlPopup(false);
    onClose(true);
  };

  return (
    <>
      <LinkIcon style={style.default} onClick={() => setShowUrlPopup(true)} />
      {showUrlPopup && (
        <div className="popup-wrapper">
          <div className="popup">
            <UrlPopup
              onConfirm={(url) => {
                handleUrlSubmit(url);
                onPopupClose();
              }}
              onCancel={() => onPopupClose()}
            />
          </div>
        </div>
      )}
    </>
  );
}
