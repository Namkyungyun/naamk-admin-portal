import { Undo, Redo } from "../ToolbarIcons";

export function UndoAction({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Undo
        onClick={() => editor.chain().focus().undo().run()}
        className={editor.isActive("undo") ? "is-active" : ""}
        style={editor.isActive("undo") ? style.active : style.default}
      />
    </>
  );
}

export function RedoAction({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Redo
        onClick={() => editor.chain().focus().redo().run()}
        className={editor.isActive("redo") ? "is-active" : ""}
        style={editor.isActive("redo") ? style.active : style.default}
      />
    </>
  );
}
