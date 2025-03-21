import { LinkIcon, CloseOutlined } from "../ToolbarIcons";
import { useCallback } from "react";

export function Link({ style, editor }) {
  if (!editor) {
    return null;
  }

  const unSetLink = () => editor.chain().focus().unsetLink().run();
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <>
      <div className="toolbar-wrapper">
        <LinkIcon
          onClick={setLink}
          style={editor.isActive("link") ? style.active : style.default}
          className={editor.isActive("link") ? "is-active" : ""}
        />
        <div
          className={`${editor.isActive("link") ? "absolute inline-block text-left" : "hidden"} `}
        >
          <button
            type="button"
            className="rounded-lg inline-flex justify-center items-center w-full border border-gray-300 shadow-sm dropdown-item"
            onClick={(e) => {
              e.stopPropagation();
              unSetLink();
            }}
          >
            <CloseOutlined style={{ fontSize: 12 }} />
          </button>
        </div>
      </div>
    </>
  );
}
