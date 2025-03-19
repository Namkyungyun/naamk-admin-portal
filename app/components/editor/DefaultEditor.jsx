"use client";

import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { FontSize } from "./toolbar/custom-extension/FontSize";
import { Color } from "@tiptap/extension-color";
import Toolbar from "./toolbar/Toolbar";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";

export default function DefaultEditor() {
  const editor = useEditor({
    extensions: [
      Document,
      StarterKit,
      Text,
      TextStyle.configure({ types: [ListItem.name] }),
      FontSize,
      Underline,
      ListItem,
      BulletList.configure({
        itemTypeName: "listItem",
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
      }),
      TaskList.configure({
        itemTypeName: "taskItem",
      }),
      TaskItem,
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    ],
    content: ``,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg control-group bg-canvas border border-bd-muted px-2 py-2">
      <Toolbar editor={editor} />
      <EditorContent className="min-h-lvw z-0" editor={editor} />
    </div>
  );
}
