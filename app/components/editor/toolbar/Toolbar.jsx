import "./styles.scss";
import { Bold, Italic, Strike, Underline } from "./items/TextDecoration";
import { TextAlignDropdown } from "./items/TextAlign";
import { ImageIcon, CodeIcon } from "./ToolbarIcons";
import FontSizeDropdown from "./items/FontSize";
import { RedoAction, UndoAction } from "./items/EditAction";
import { Link } from "./items/Link";
import { Video } from "./items/Video";
import {
  BulletListDropdown,
  OrderListDropdown,
  TaskListDropdown,
} from "./items/TextList";

const iconStyle = {
  default: { fontSize: 20, color: "white", margin: 2 },
  active: { fontSize: 20, color: "blue", margin: 2 },
  dropdown: { fontSize: 18, color: "white" },
};

export default function Toolbar({ editor, fileManagement }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg control-group bg-gray-500 border border-bd-subtle px-3 py-1">
      <div className="flex grid grid-rows">
        {/* 텍스트 데코레이션 */}
        <div className="flex flex-wrap justify-start">
          <div className="flex items-center mx-1">
            <UndoAction style={iconStyle} editor={editor} />
            <RedoAction style={iconStyle} editor={editor} />
          </div>
          <div className="flex items-center mx-1">
            <TextAlignDropdown style={iconStyle} editor={editor} />
            <Bold style={iconStyle} editor={editor} />
            <Italic style={iconStyle} editor={editor} />
            <Underline style={iconStyle} editor={editor} />
            <Strike style={iconStyle} editor={editor} />
          </div>

          <div className="flex items-center gap-1 mx-1">
            <BulletListDropdown style={iconStyle} editor={editor} />
            <OrderListDropdown style={iconStyle} editor={editor} />
            <TaskListDropdown style={iconStyle} editor={editor} />
            <FontSizeDropdown style={iconStyle} editor={editor} />
          </div>

          <div className="flex items-center gap-1 mx-1">
            <Link style={iconStyle} editor={editor} />
            <Video
              style={iconStyle}
              editor={editor}
              fileManagement={fileManagement}
            />
            <button>
              <ImageIcon style={iconStyle} />
            </button>
            <button>
              <CodeIcon style={iconStyle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
