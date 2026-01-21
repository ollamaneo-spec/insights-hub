import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import RichTextToolbar from "./RichTextToolbar";
import { useEffect, useRef, useCallback } from "react";

// Black color for user edits
const USER_COLOR = "hsl(0, 0%, 15%)";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  onAutoSave?: (content: string) => void;
  autoColorUserText?: boolean;
  autoSaveDelay?: number; // Debounce delay in ms
}

const RichTextEditor = ({ 
  content, 
  onChange, 
  onAutoSave,
  autoColorUserText = true,
  autoSaveDelay = 1000 
}: RichTextEditorProps) => {
  const initialContentRef = useRef(content);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedContentRef = useRef(content);

  // Debounced autosave function
  const triggerAutoSave = useCallback((html: string) => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      if (html !== lastSavedContentRef.current) {
        lastSavedContentRef.current = html;
        onAutoSave?.(html);
        console.log("Autosave triggered");
      }
    }, autoSaveDelay);
  }, [onAutoSave, autoSaveDelay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

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
      const html = editor.getHTML();
      onChange?.(html);
      triggerAutoSave(html);
    },
    onFocus: ({ editor }) => {
      // When user clicks to type, ensure new text will be black
      if (autoColorUserText) {
        editor.commands.setColor(USER_COLOR);
      }
    },
    onSelectionUpdate: ({ editor }) => {
      if (autoColorUserText && editor.isEditable) {
        // Always set user color when selection changes for new typing
        editor.commands.setColor(USER_COLOR);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none h-full p-4 [&_p]:my-2",
      },
      handleTextInput: (view, from, to, text) => {
        // Before inserting text, ensure color mark is set to black
        if (autoColorUserText && view.state.tr) {
          const { state, dispatch } = view;
          const colorMark = state.schema.marks.textStyle;
          if (colorMark) {
            const mark = colorMark.create({ color: USER_COLOR });
            const tr = state.tr.addStoredMark(mark);
            dispatch(tr);
          }
        }
        return false; // Let default handling continue
      },
    },
  });

  // Apply user color immediately when editor is ready
  useEffect(() => {
    if (editor && autoColorUserText) {
      // Set stored mark for black color
      const colorMark = editor.schema.marks.textStyle;
      if (colorMark) {
        editor.commands.setColor(USER_COLOR);
      }
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
