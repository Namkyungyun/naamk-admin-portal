import "@/app/(portal)/(demo)/editor/components/styles.scss";
import { useState, useRef } from "react";
import { Dropdown } from "./Dropdown";
import { ImageIcon, LinkIcon, FileUploadOutlined } from "../ToolbarIcons";
import UrlPopup from "../UrlPopup";

export function Image({ style, editor, fileManagement }) {
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
    <ImageIcon
      style={editor.isActive("image") ? style.active : style.default}
    />
  );

  const items = [
    <ImageUpload
      style={style}
      editor={editor}
      fileManagement={fileManagement}
      onClose={onCloseDropdown}
    />,
    <ImageUrlUpload
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

export function ImageUpload({ style, editor, fileManagement, onClose }) {
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

      // 📌 TipTap에 이미지 삽입 (ID 포함)
      editor.chain().focus().setImage({ id, src: blobUrl }).run();
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
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleVideoUpload}
      />
    </div>
  );
}

export function ImageUrlUpload({ style, editor, fileManagement, onClose }) {
  if (!editor) {
    return null;
  }

  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const handleUrlSubmit = (url) => {
    editor.chain().focus().setImage({ id: null, src: url }).run();

    onClose(true);
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
