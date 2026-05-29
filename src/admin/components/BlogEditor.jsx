import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { uploadImage } from "../../components/utils/uploadImage";

const lowlight = createLowlight(all);

const BlogEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value || "<p>Start writing your blog...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const btnClass = (active) =>
    `px-3 py-1 rounded text-sm ${
      active ? "bg-black text-white" : "bg-gray-200"
    }`;

  return (
    <div className="border rounded-lg bg-white text-black">

      {/* TOOLBAR */}
      <div className="flex gap-2 flex-wrap p-2 border-b bg-gray-100">

        <button
          className={btnClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          className={btnClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          className={btnClass(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </button>

        <button
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          className={btnClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </button>

        <button
          className={btnClass(editor.isActive("codeBlock"))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </button>

        <button
          onClick={async () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = async () => {
              const file = input.files[0];
              const url = await uploadImage(file);

              editor.chain().focus().setImage({ src: url }).run();
            };

            input.click();
          }}
        >
          Image
        </button>
      </div>

      {/* EDITOR */}
      <div className="p-4 min-h-[300px] prose max-w-none">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
};

export default BlogEditor;