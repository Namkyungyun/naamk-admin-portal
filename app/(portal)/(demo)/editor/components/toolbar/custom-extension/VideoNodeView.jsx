import { NodeViewWrapper } from "@tiptap/react";
import { ResizableBox } from "react-resizable";
import { useState } from "react";
import "react-resizable/css/styles.css";

export default function VideoNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}) {
  const { src, width, height, alignment, embedType } = node.attrs;
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

  // YouTube 여부 판단 함수
  const isYouTubeUrl = (url) => {
    return /(?:youtu\.be\/|youtube\.com\/)/.test(url);
  };

  return (
    <NodeViewWrapper
      className={`my-2 flex ${alignmentClass} relative group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ResizableBox
        width={width}
        height={height}
        onResizeStop={handleResize}
        resizeHandles={["se"]}
        minConstraints={[200, 150]}
        maxConstraints={[800, 600]}
        className={
          selected
            ? "border-2 border-blue-500 overflow-hidden"
            : "overflow-hidden"
        }
      >
        {/* ❌ 삭제 버튼 - 비디오 위에 딱 붙게 */}
        {hovered && (
          <button
            onClick={deleteNode}
            className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-gray-400 z-10"
            title="삭제"
          >
            ×
          </button>
        )}

        {embedType === "iframe" ? (
          <iframe
            src={src}
            width="100%"
            height="100%"
            allow={
              isYouTubeUrl(src)
                ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                : "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            }
            allowFullScreen
            style={{
              display: "block",
              borderRadius: "4px",
              objectFit: "contain",
            }}
          />
        ) : (
          <video
            src={src}
            controls
            autoPlay={false}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
            }}
          />
        )}
      </ResizableBox>
    </NodeViewWrapper>
  );
}
