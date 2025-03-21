import { Node, mergeAttributes, nodeViewProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoNodeView from "./VideoNodeView.jsx"; // 직접 만든 컴포넌트

export const CustomVideo = Node.create({
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
    };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setVideo:
        ({ id, src }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { id, src },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView); // 📌 여기서 React 렌더링 사용
  },
});

// export const CustomVideo = Node.create({
//   name: "video",
//   group: "block",
//   atom: true,

//   addAttributes() {
//     return {
//       id: { default: null },
//       src: { default: null },
//       controls: { default: true },
//       width: { default: "500px" }, // 기본값
//       height: { default: null }, // 선택값
//     };
//   },

//   parseHTML() {
//     return [{ tag: "video" }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       "video",
//       {
//         ...HTMLAttributes,
//         width: HTMLAttributes.width || "500px",
//       },
//     ];
//   },

//   addCommands() {
//     return {
//       setVideo:
//         ({ id, src, width }) =>
//         ({ commands }) => {
//           return commands.insertContent({
//             type: this.name,
//             attrs: { id, src, width },
//           });
//         },

//       updateVideoSize:
//         ({ width }) =>
//         ({ tr, state, dispatch }) => {
//           const { selection } = state;
//           const { $from } = selection;

//           if ($from.nodeAfter?.type.name !== "video") return false;

//           const pos = $from.pos;
//           const node = $from.nodeAfter;

//           const newNode = node.type.create({ ...node.attrs, width });

//           tr.replaceWith(pos, pos + node.nodeSize, newNode);
//           dispatch(tr);
//           return true;
//         },
//     };
//   },
// });

// export const CustomVideo = Node.create({
//   name: "video",
//   group: "block",
//   atom: true, // 단일 노드로 다룸

//   addAttributes() {
//     return {
//       id: { default: null },
//       src: { default: null },
//       controls: { default: true },
//       width: { default: "500px" },
//     };
//   },

//   parseHTML() {
//     return [{ tag: "video" }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ["video", mergeAttributes(HTMLAttributes)];
//   },

//   addCommands() {
//     return {
//       setVideo:
//         ({ id, src }) =>
//         ({ commands }) => {
//           return commands.insertContent({
//             type: this.name,
//             attrs: { id, src },
//           });
//         },
//     };
//   },
// });
