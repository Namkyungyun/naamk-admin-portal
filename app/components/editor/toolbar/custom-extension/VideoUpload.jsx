import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoNodeView from "./VideoNodeView.jsx"; // 직접 만든 컴포넌트

export const CustomVideoUpload = Node.create({
  name: "video",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      src: { default: null },
      width: { default: 480 },
      height: { default: 270 },
      controls: { default: true },
      embedType: { default: "video" }, // "video" or "iframe"
      alignment: { default: "center" },
    };
  },

  parseHTML() {
    return [{ tag: "video" }, { tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { embedType, ...attrs } = HTMLAttributes;
    if (embedType === "iframe") {
      return ["iframe", mergeAttributes(attrs)];
    }
    return ["video", mergeAttributes(attrs)];
  },

  addCommands() {
    return {
      setVideo:
        ({ id, src, embedType = "video" }) =>
        ({ tr, state, dispatch }) => {
          const videoNode = this.type.create({ id, src, embedType });
          const paragraphNode = state.schema.nodes.paragraph.create();

          // 1. 현재 위치에 비디오 삽입
          tr.replaceSelectionWith(videoNode);

          // 2. 비디오 뒤에 문단 삽입
          const insertPos = tr.selection.$to.pos + 1;
          const safePos = Math.min(insertPos, tr.doc.content.size);
          tr.insert(safePos, paragraphNode);

          // 3. 커서를 새 문단으로 이동
          const resolvedPos = tr.doc.resolve(
            Math.min(safePos + 1, tr.doc.content.size)
          );
          tr.setSelection(state.selection.constructor.near(resolvedPos));

          if (dispatch) dispatch(tr);
          return true;
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView); // 📌 여기서 React 렌더링 사용
  },
});
