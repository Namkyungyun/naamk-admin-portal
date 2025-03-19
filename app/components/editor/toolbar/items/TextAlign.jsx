import {
  FormatAlignLeftIcon,
  FormatAlignCenterIcon,
  FormatAlignRightIcon,
  FormatAlignJustifyIcon,
} from "../ToolbarIcons";
import { Dropdown } from "./Dropdown";

export function TextAlignDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const aligns = [
    <TextAlignJustify style={style} editor={editor} />,
    <TextAlignLeft style={style} editor={editor} />,
    <TextAlignRight style={style} editor={editor} />,
    <TextAlignCenter style={style} editor={editor} />,
  ];

  const selectedAlign = () => {
    return editor.isActive({ textAlign: "justify" }) ? (
      <TextAlignJustify style={style} editor={editor} />
    ) : editor.isActive({ textAlign: "left" }) ? (
      <TextAlignLeft style={style} editor={editor} />
    ) : editor.isActive({ textAlign: "right" }) ? (
      <TextAlignRight style={style} editor={editor} />
    ) : editor.isActive({ textAlign: "center" }) ? (
      <TextAlignCenter style={style} editor={editor} />
    ) : (
      <TextAlignJustify style={style} editor={editor} />
    );
  };

  return (
    <>
      <Dropdown items={aligns} selectedItem={selectedAlign()} />
    </>
  );
}

export function TextAlignLeft({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatAlignLeftIcon
        style={
          editor.isActive({ textAlign: "left" }) ? style.active : style.default
        }
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        disabled={!editor.can().chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      />
    </>
  );
}

export function TextAlignRight({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatAlignRightIcon
        style={
          editor.isActive({ textAlign: "right" }) ? style.active : style.default
        }
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        disabled={!editor.can().chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      />
    </>
  );
}

export function TextAlignCenter({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatAlignCenterIcon
        style={
          editor.isActive({ textAlign: "center" })
            ? style.active
            : style.default
        }
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        disabled={!editor.can().chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      />
    </>
  );
}

export function TextAlignJustify({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatAlignJustifyIcon
        style={
          editor.isActive({ textAlign: "justify" })
            ? style.active
            : style.default
        }
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      />
    </>
  );
}
