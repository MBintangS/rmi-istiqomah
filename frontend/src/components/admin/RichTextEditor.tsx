"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  error?: boolean;
  className?: string;
}

export function RichTextEditor({ value, onChange, error, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] px-3 py-2 focus:outline-none text-foreground",
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[240px] rounded-rmi border border-foreground/20 bg-surface p-3 text-sm text-foreground/50">
        Memuat editor...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-rmi border bg-background",
        error ? "border-red-500" : "border-foreground/20",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-foreground/10 bg-surface p-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        />
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="List"
        />
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1."
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded px-2 py-1 text-xs font-medium transition-colors",
        active ? "bg-primary text-white" : "text-foreground/70 hover:bg-primary/10 hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}
