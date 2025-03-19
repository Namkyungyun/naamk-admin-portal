import {
  FormatListNumberedIcon,
  FormatListBulletedIcon,
  Checklist,
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
  PlaylistAdd,
  AddCircleOutlineOutlined,
} from "../ToolbarIcons";
import "../styles.scss";
import { Dropdown } from "./Dropdown";

export function BulletListDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const options = [
    <PlaylistAdd
      onClick={() => editor.chain().focus().splitListItem("listItem").run()}
      disabled={!editor.can().splitListItem("listItem")}
    />,
    <SubdirectoryArrowRight
      onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
      disabled={!editor.can().sinkListItem("listItem")}
    />,
    <SubdirectoryArrowLeft
      onClick={() => editor.chain().focus().liftListItem("listItem").run()}
      disabled={!editor.can().liftListItem("listItem")}
    />,
  ];

  const bulletButton = (
    <AddCircleOutlineOutlined
      className={editor.isActive("bulletList") ? "is-active" : ""}
      style={{ fontSize: 18 }}
    />
  );

  return (
    <>
      <div>
        <FormatListBulletedIcon
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        />

        <Dropdown
          size={18}
          autoClose={false}
          items={options}
          selectedItem={bulletButton}
        />
      </div>
    </>
  );
}

export function OrderListDropdown({ style, editor }) {
  if (!editor) {
    return null;
  }

  const options = [
    <PlaylistAdd
      onClick={() => editor.chain().focus().splitListItem("listItem").run()}
      disabled={!editor.can().splitListItem("listItem")}
    />,
    <SubdirectoryArrowRight
      onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
      disabled={!editor.can().sinkListItem("listItem")}
    />,
    <SubdirectoryArrowLeft
      onClick={() => editor.chain().focus().liftListItem("listItem").run()}
      disabled={!editor.can().liftListItem("listItem")}
    />,
  ];

  const bulletButton = <AddCircleOutlineOutlined style={{ fontSize: 18 }} />;

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <FormatListNumberedIcon
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          />

          <Dropdown
            size={18}
            autoClose={false}
            items={options}
            selectedItem={bulletButton}
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

  const options = [
    <PlaylistAdd
      onClick={() => editor.chain().focus().splitListItem("taskItem").run()}
      disabled={!editor.can().splitListItem("taskItem")}
    />,
    <SubdirectoryArrowRight
      onClick={() => editor.chain().focus().sinkListItem("taskItem").run()}
      disabled={!editor.can().sinkListItem("taskItem")}
    />,
    <SubdirectoryArrowLeft
      onClick={() => editor.chain().focus().liftListItem("taskItem").run()}
      disabled={!editor.can().liftListItem("taskItem")}
    />,
  ];

  const bulletButton = (
    <AddCircleOutlineOutlined
      className={editor.isActive("taskList") ? "is-active" : ""}
      style={{ fontSize: 18 }}
    />
  );

  return (
    <>
      <div>
        <Checklist
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive("taskList") ? "is-active" : ""}
        />

        <Dropdown
          size={18}
          autoClose={false}
          items={options}
          selectedItem={bulletButton}
        />
      </div>
    </>
  );
}
