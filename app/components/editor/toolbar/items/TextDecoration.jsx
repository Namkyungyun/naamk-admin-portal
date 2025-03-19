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
      <FormatBoldIcon
        style={editor.isActive("bold") ? style.active : style.default}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
    </>
  );
}

export function Italic({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatItalicIcon
        style={editor.isActive("italic") ? style.active : style.default}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
    </>
  );
}

export function Underline({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatUnderlinedIcon
        style={editor.isActive("underline") ? style.active : style.default}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      />
    </>
  );
}

export function Strike({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatStrikethroughIcon
        style={editor.isActive("strike") ? style.active : style.default}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      />
    </>
  );
}
