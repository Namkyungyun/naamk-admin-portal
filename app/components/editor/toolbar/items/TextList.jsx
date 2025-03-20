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
  const optionButton = <AddCircleOutlineOutlined style={{ fontSize: 18 }} />;
  const options = [
    <ListAddButton editor={editor} dataType={optionDataType} />,
    <SubListApplyButton editor={editor} dataType={optionDataType} />,
    <ListEscapeButton editor={editor} dataType={optionDataType} />,
  ];

  return (
    <>
      <div>
        <FormatListBulletedIcon
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive(dataType) ? "is-active" : ""}
          style={editor.isActive(dataType) ? style.active : style.default}
        />

        <Dropdown
          size={18}
          autoClose={false}
          items={options}
          selectedItem={optionButton}
        />
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
  const optionButton = <AddCircleOutlineOutlined style={{ fontSize: 18 }} />;
  const options = [
    <ListAddButton editor={editor} dataType={optionDataType} />,
    <SubListApplyButton editor={editor} dataType={optionDataType} />,
    <ListEscapeButton editor={editor} dataType={optionDataType} />,
  ];

  return (
    <>
      <div className="button-group">
        <FormatListNumberedIcon
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive(dataType) ? "is-active" : ""}
          style={editor.isActive(dataType) ? style.active : style.default}
        />

        <Dropdown
          size={18}
          autoClose={false}
          items={options}
          selectedItem={optionButton}
        />
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
  const optionButton = <AddCircleOutlineOutlined style={{ fontSize: 18 }} />;
  const options = [
    <ListAddButton editor={editor} dataType={optionDataType} />,
    <SubListApplyButton editor={editor} dataType={optionDataType} />,
    <ListEscapeButton editor={editor} dataType={optionDataType} />,
  ];

  return (
    <>
      <div>
        <Checklist
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive(dataType) ? "is-active" : ""}
          style={editor.isActive(dataType) ? style.active : style.default}
        />

        <Dropdown
          size={18}
          autoClose={false}
          items={options}
          selectedItem={optionButton}
        />
      </div>
    </>
  );
}

/// options
export function ListAddButton({ editor, dataType }) {
  if (!editor) {
    return null;
  }
  return (
    <PlaylistAdd
      onClick={() => editor.chain().focus().splitListItem(dataType).run()}
      disabled={!editor.can().splitListItem(dataType)}
    />
  );
}

export function SubListApplyButton({ editor, dataType }) {
  if (!editor) {
    return null;
  }

  return (
    <SubdirectoryArrowRight
      onClick={() => editor.chain().focus().sinkListItem(dataType).run()}
      disabled={!editor.can().sinkListItem()}
    />
  );
}

export function ListEscapeButton({ editor, dataType }) {
  if (!editor) {
    return null;
  }

  return (
    <SubdirectoryArrowLeft
      onClick={() => editor.chain().focus().liftListItem(dataType).run()}
      disabled={!editor.can().liftListItem(dataType)}
    />
  );
}
