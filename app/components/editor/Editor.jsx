"use client";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { FontSize } from "./toolbar/custom-extension/FontSize";
import { CustomVideo } from "./toolbar/custom-extension/VideoAttachment";
import { Color } from "@tiptap/extension-color";
import Toolbar from "./toolbar/Toolbar";
import { EditorContent, useEditor } from "@tiptap/react";

export default function Editor({
  fileManagement,
  exportHtml,
  onExportPreFilter,
  onExportAfterFilter,
}) {
  useEffect(() => {}, []);

  useEffect(() => {
    if (exportHtml) {
      exportToHtml();
    }
  }, [exportHtml]);

  const exportToHtml = () => {
    onExportPreFilter(editor);
    onExportAfterFilter(editor);
  };

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      StarterKit,
      Text,
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      FontSize,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      ...listConfig,
      linkConfig,
      CustomVideo,
    ],
    content: ``,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg control-group bg-canvas px-2 py-2">
      <Toolbar editor={editor} fileManagement={fileManagement} />
      <EditorContent className="z-0" editor={editor} />
    </div>
  );
}

//////// configuration ////////
const listConfig = [
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
  TaskItem.configure({
    nested: true,
  }),
];

const linkConfig = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https"],
  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const disallowedProtocols = ["ftp", "file", "mailto"];
      const protocol = parsedUrl.protocol.replace(":", "");

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((p) =>
        typeof p === "string" ? p : p.scheme
      );

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
      const domain = parsedUrl.hostname;

      if (disallowedDomains.includes(domain)) {
        return false;
      }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },
  shouldAutoLink: (url) => {
    try {
      // construct URL
      const parsedUrl = url.includes(":")
        ? new URL(url)
        : new URL(`https://${url}`);

      // only auto-link if the domain is not in the disallowed list
      const disallowedDomains = [
        "example-no-autolink.com",
        "another-no-autolink.com",
      ];
      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
});
