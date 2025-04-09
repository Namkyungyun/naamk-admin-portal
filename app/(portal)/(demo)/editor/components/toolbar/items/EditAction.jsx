import { Undo, Redo } from "../ToolbarIcons";

export function UndoAction({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <Undo
          onClick={() => editor.chain().focus().undo().run()}
          className={editor.isActive("undo") ? "is-active" : ""}
          style={editor.isActive("undo") ? style.active : style.default}
        />
      </div>
    </>
  );
}

export function RedoAction({ style, editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar-wrapper">
        <Redo
          onClick={() => editor.chain().focus().redo().run()}
          className={editor.isActive("redo") ? "is-active" : ""}
          style={editor.isActive("redo") ? style.active : style.default}
        />
      </div>
    </>
  );
}
