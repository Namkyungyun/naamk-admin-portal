import "../styles.scss";
import {
  FormatListNumberedIcon,
  FormatListBulletedIcon,
  Checklist,
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
  PlaylistAdd,
  AddCircleOutlineOutlined,
} from "../ToolbarIcons";
import { Dropdown } from "./Dropdown";

export function BulletListDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const dataType = "bulletList";
  const optionDataType = "listItem";
  const optionButton = <AddButton style={style} />;
  const options = commonOptions(style, editor, optionDataType);

  return (
    <>
      <div className="toolbar-option-menu-wrapper">
        <div className="toolbar-option-menu">
          <FormatListBulletedIcon
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive(dataType) ? "is-active" : ""}
            style={editor.isActive(dataType) ? style.active : style.default}
          />
        </div>

        <div className="toolbar-option-btn">
          <Dropdown
            isSmall={true}
            autoClose={false}
            items={options}
            selectedItem={optionButton}
          />
        </div>
      </div>
    </>
  );
}

export function OrderListDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const dataType = "orderedList";
  const optionDataType = "listItem";
  const optionButton = <AddButton style={style} />;
  const options = commonOptions(style, editor, optionDataType);

  return (
    <>
      <div className="toolbar-option-menu-wrapper">
        <div className="toolbar-option-menu">
          <FormatListNumberedIcon
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive(dataType) ? "is-active" : ""}`}
            style={editor.isActive(dataType) ? style.active : style.default}
          />
        </div>
        <div className="toolbar-option-btn">
          <Dropdown
            isSmall={true}
            autoClose={false}
            items={options}
            selectedItem={optionButton}
          />
        </div>
      </div>
    </>
  );
}

export function TaskListDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const dataType = "taskList";
  const optionDataType = "taskItem";
  const optionButton = <AddButton style={style} />;
  const options = commonOptions(style, editor, optionDataType);

  return (
    <>
      <div className="toolbar-option-menu-wrapper">
        <div className="toolbar-option-menu">
          <Checklist
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive(dataType) ? "is-active" : ""}
            style={editor.isActive(dataType) ? style.active : style.default}
          />
        </div>

        <div className="toolbar-option-btn">
          <Dropdown
            isSmall={true}
            autoClose={false}
            items={options}
            selectedItem={optionButton}
          />
        </div>
      </div>
    </>
  );
}

function commonOptions(style, editor, dataType) {
  return [
    <ListAddButton style={style} editor={editor} dataType={dataType} />,
    <SubListApplyButton style={style} editor={editor} dataType={dataType} />,
    <ListEscapeButton style={style} editor={editor} dataType={dataType} />,
  ];
}

export function AddButton({ style }) {
  return <AddCircleOutlineOutlined style={style.dropdown} />;
}

/// options
export function ListAddButton({ style, editor, dataType }) {
  if (!editor) {
    return null;
  }
  return (
    <PlaylistAdd
      style={style.default}
      onClick={() => editor.chain().focus().splitListItem(dataType).run()}
      disabled={!editor.can().splitListItem(dataType)}
    />
  );
}

export function SubListApplyButton({ style, editor, dataType }) {
  if (!editor) {
    return null;
  }

  return (
    <SubdirectoryArrowRight
      style={style.default}
      onClick={() => editor.chain().focus().sinkListItem(dataType).run()}
      disabled={!editor.can().sinkListItem()}
    />
  );
}

export function ListEscapeButton({ style, editor, dataType }) {
  if (!editor) {
    return null;
  }

  return (
    <SubdirectoryArrowLeft
      style={style.default}
      onClick={() => editor.chain().focus().liftListItem(dataType).run()}
      disabled={!editor.can().liftListItem(dataType)}
    />
  );
}
