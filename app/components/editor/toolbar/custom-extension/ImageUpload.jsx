import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "./ImageNodeView.jsx";

export const CustomImageUpload = Node.create({
  name: "image",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      id: { default: null },
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: 400 },
      height: { default: "auto" },
      alignment: { default: "center" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage:
        ({ id, src }) =>
        ({ tr, state, dispatch }) => {
          const imageNode = this.type.create({ id, src });
          const paragraphNode = state.schema.nodes.paragraph.create();

          // 1. 현재 위치에 비디오 삽입
          tr.replaceSelectionWith(imageNode);

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
    return ReactNodeViewRenderer(ImageNodeView);
  },
});
