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

export default function Toolbar({ editor }) {
  if (!editor) {
    return null;
  }

  const iconStyle = {
    default: { fontSize: 18, color: "black", margin: 2 },
    active: { fontSize: 18, color: "blue", margin: 2 },
  };

  return (
    <div className="rounded-lg control-group bg-subtle border border-bd-subtle">
      <div className="flex flex-row justify-between items-center px-5 py-1 ">
        {/* 텍스트 데코레이션 */}
        <Bold style={iconStyle} editor={editor} />
        <Italic style={iconStyle} editor={editor} />
        <Underline style={iconStyle} editor={editor} />
        <Strike style={iconStyle} editor={editor} />

        {/* 텍스트 정렬 및 사이즈 */}

        <TextAlignDropdown style={iconStyle} editor={editor} />
        <FontSizeDropdown style={iconStyle} editor={editor} />

        {/* 리스트 */}
        <BulletListDropdown style={iconStyle} editor={editor} />
        <OrderListDropdown style={iconStyle} editor={editor} />
        <TaskListDropdown style={iconStyle} editor={editor} />

        {/* 첨부 */}
        <div className="mx-2" />
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
  );
}
