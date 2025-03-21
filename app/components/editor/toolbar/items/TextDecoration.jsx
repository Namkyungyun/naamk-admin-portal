import {
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  FormatStrikethroughIcon,
} from "../ToolbarIcons";

export function Bold({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <FormatBoldIcon
          style={editor.isActive("bold") ? style.active : style.default}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        />
      </div>
    </>
  );
}

export function Italic({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <FormatItalicIcon
          style={editor.isActive("italic") ? style.active : style.default}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        />
      </div>
    </>
  );
}

export function Underline({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <FormatUnderlinedIcon
          style={editor.isActive("underline") ? style.active : style.default}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        />
      </div>
    </>
  );
}

export function Strike({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <FormatStrikethroughIcon
          style={editor.isActive("strike") ? style.active : style.default}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        />
      </div>
    </>
  );
}
