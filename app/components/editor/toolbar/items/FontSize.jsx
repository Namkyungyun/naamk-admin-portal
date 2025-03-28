import { useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { TextFieldsIcon } from "../ToolbarIcons";

export default function FontSizeDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  useEffect(() => {
    editor.chain().focus().setFontSize(getFontSize(defaultFontSize)).run();
  }, []);

  const getFontSize = (size) => `${size}px`;
  const defaultFontSize = 16;
  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 32, 36, 48, 60, 72];
  const fontSizeButtons = fontSizes.map((size) => {
    return (
      <div
        className={`py-1 text-sm text-${style.default.color}`}
        onClick={() =>
          editor.chain().focus().setFontSize(getFontSize(size)).run()
        }
        disabled={!editor.can().chain().focus().setFontSize().run()}
      >
        {size}
      </div>
    );
  });

  const selectedFontSize = () => {
    const currentFontSize = fontSizes.find((size) =>
      editor.isActive("textStyle", {
        fontSize: getFontSize(size),
      })
    );

    return (
      <div>
        <TextFieldsIcon style={style.default} />
        <span className={`text-sm text-${style.default.color}`}>
          {currentFontSize ?? defaultFontSize}
        </span>
      </div>
    );
  };

  return (
    <>
      <Dropdown items={fontSizeButtons} selectedItem={selectedFontSize()} />
    </>
  );
}
