import "./styles.scss";
import { Bold, Italic, Strike, Underline } from "./items/TextDecoration";
import { TextAlignDropdown } from "./items/TextAlign";
import { LinkIcon, ImageIcon, VideoCall, CodeIcon } from "./ToolbarIcons";
import FontSizeDropdown from "./items/FontSize";
import {
  BulletListDropdown,
  OrderListDropdown,
  TaskListDropdown,
} from "./items/TextList";
import { RedoAction, UndoAction } from "./items/EditAction";

const iconStyle = {
  default: { fontSize: 20, color: "black", margin: 2 },
  active: { fontSize: 20, color: "blue", margin: 2 },
};

export default function Toolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg control-group bg-gray-400 border border-bd-subtle px-3 py-1">
      <div className="flex grid grid-rows">
        {/* 텍스트 데코레이션 */}
        <div className="flex flex-wrap justify-start">
          <div className="flex items-center gap-5">
            <UndoAction style={iconStyle} editor={editor} />
            <RedoAction style={iconStyle} editor={editor} />
            <Bold style={iconStyle} editor={editor} />
            <Italic style={iconStyle} editor={editor} />
            <Underline style={iconStyle} editor={editor} />
            <Strike style={iconStyle} editor={editor} />
          </div>

          <div className="flex items-center gap-5">
            <BulletListDropdown style={iconStyle} editor={editor} />
            <OrderListDropdown style={iconStyle} editor={editor} />
            <TaskListDropdown style={iconStyle} editor={editor} />
            <TextAlignDropdown style={iconStyle} editor={editor} />
            <FontSizeDropdown style={iconStyle} editor={editor} />
          </div>

          <div className="flex items-center gap-5">
            <button>
              <LinkIcon style={iconStyle} />
            </button>
            <button>
              <ImageIcon style={iconStyle} />
            </button>
            <button>
              <VideoCall style={iconStyle} />
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
