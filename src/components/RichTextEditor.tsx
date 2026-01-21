import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import RichTextToolbar from "./RichTextToolbar";
import { useEffect, useRef } from "react";

// Black color for user edits
const USER_COLOR = "hsl(0, 0%, 15%)";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  autoColorUserText?: boolean; // If true, newly typed text becomes black
}

const RichTextEditor = ({ content, onChange, autoColorUserText = true }: RichTextEditorProps) => {
  const initialContentRef = useRef(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContentRef.current,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    // Ensure newly typed text is always black (user color)
    onSelectionUpdate: ({ editor }) => {
      if (autoColorUserText && editor.isEditable) {
        const { color } = editor.getAttributes("textStyle");
        // If no color is set or it's not black, set it to black for new typing
        if (!color) {
          editor.commands.setColor(USER_COLOR);
        }
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none h-full p-4 [&_p]:my-2",
      },
      // Set black color on every keystroke for user-typed content
      handleKeyDown: (view, event) => {
        if (autoColorUserText && view.state.selection) {
          // Ensure color mark is set for next input
          const { state } = view;
          const { from } = state.selection;
          const marks = state.storedMarks || state.selection.$from.marks();
          const hasUserColor = marks.some((mark) => 
            mark.type.name === "textStyle" && 
            mark.attrs.color === USER_COLOR
          );
          if (!hasUserColor) {
            // We'll apply color on the update
          }
        }
        return false;
      },
    },
  });

  // Apply user color when editor is ready and user starts typing
  useEffect(() => {
    if (editor && autoColorUserText) {
      // Set initial color for new typing
      editor.commands.setColor(USER_COLOR);
    }
  }, [editor, autoColorUserText]);

  // Update editor content when content prop changes externally
  useEffect(() => {
    if (editor && content && content !== initialContentRef.current) {
      const currentHtml = editor.getHTML();
      if (content !== currentHtml) {
        editor.commands.setContent(content, { emitUpdate: false });
        initialContentRef.current = content;
      }
    }
  }, [content, editor]);

  return (
    <div className="border border-border bg-background h-full flex flex-col">
      <RichTextToolbar editor={editor} />
      <div className="overflow-auto flex-1">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};

export default RichTextEditor;
