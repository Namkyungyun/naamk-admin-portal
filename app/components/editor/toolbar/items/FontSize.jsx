import { useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { TextFieldsIcon } from "../ToolbarIcons";

export default function FontSizeDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const defaultFontSize = 16;
  const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 32, 36, 48, 60, 72];
  const getFontSize = (size) => `${size}px`;

  useEffect(() => {
    editor.chain().focus().setFontSize(getFontSize(defaultFontSize)).run();
  }, []);

  const fontSizeButtons = fontSizes.map((size) => {
    return (
      <div
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
        <span>{currentFontSize ?? defaultFontSize}</span>
      </div>
    );
  };

  return (
    <>
      <Dropdown items={fontSizeButtons} selectedItem={selectedFontSize()} />
    </>
  );
}
