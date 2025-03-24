import { NodeViewWrapper } from "@tiptap/react";
import { ResizableBox } from "react-resizable";
import { useState } from "react";
import "react-resizable/css/styles.css";

export default function ImageNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}) {
  const { src, width, height, alt, alignment } = node.attrs;
  const [hovered, setHovered] = useState(false);

  const handleResize = (e, { size }) => {
    updateAttributes({
      width: size.width,
      height: size.height,
    });
  };

  const alignmentClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[alignment || "center"];

  return (
    <NodeViewWrapper
      className={`my-2 flex ${alignmentClass} relative group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ResizableBox
        width={width}
        height={height === "auto" ? 300 : height}
        resizeHandles={["se"]}
        minConstraints={[100, 100]}
        maxConstraints={[800, 800]}
        onResizeStop={handleResize}
        className={
          selected
            ? "border-2 border-blue-500 overflow-hidden"
            : "overflow-hidden"
        }
      >
        {hovered && (
          <button
            onClick={deleteNode}
            className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-gray-400 z-10"
            title="삭제"
          >
            ×
          </button>
        )}

        <img
          src={src}
          alt={alt || "이미지"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </ResizableBox>
    </NodeViewWrapper>
  );
}
