"use client"

import * as React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { HeadingNode } from "@lexical/rich-text"
import { ListNode } from "@lexical/list"
import { LinkNode } from "@lexical/link"
import { CodeNode, CodeHighlightNode } from "@lexical/code"

import type { LexicalEditor } from "lexical"
import { TRANSFORMERS } from "@lexical/markdown"

import { cn } from "@workspace/ui/lib/utils"
import { richTextEditorTheme } from "@workspace/ui/lib/rich-text-editor-theme"
import { RichTextToolbar } from "@workspace/ui/components/rich-text-toolbar"
import { CodeHighlightingPlugin } from "@workspace/ui/components/code-highlighting-plugin"
import {
  editorStateFromHTML,
  editorStateFromJSON,
  snapshot,
  type LexicalSerializedEditorState,
} from "@workspace/ui/lib/rich-text-utils"

export type RichTextSnapshot = { html: string; json: LexicalSerializedEditorState }
export type RichTextValue = string | LexicalSerializedEditorState

export type RichTextEditorProps = {
  value?: RichTextValue
  defaultValue?: RichTextValue
  format?: "html" | "json" | "auto"
  onChange?: (value: RichTextSnapshot) => void
  placeholder?: React.ReactNode
  disabled?: boolean
  className?: string
  minHeight?: number
  toolbar?: boolean
}

function EditableController({ disabled }: { disabled?: boolean }) {
  const [editor] = useLexicalComposerContext()
  React.useEffect(() => {
    if (!editor) return
    editor.setEditable(!disabled)
  }, [editor, disabled])
  return null
}

function ApplyValue({ value, format }: { value?: RichTextValue; format: "html" | "json" | "auto" }) {
  const [editor] = useLexicalComposerContext()
  const prev = React.useRef<RichTextValue | undefined>(undefined)

  React.useEffect(() => {
    if (!editor) return
    if (value === undefined || value === prev.current) return
    prev.current = value

    const useHTML = format === "html" || (format === "auto" && typeof value === "string")
    const useJSON = format === "json" || (format === "auto" && typeof value !== "string")

    if (useHTML && typeof value === "string") {
      editorStateFromHTML(value)(editor)
    } else if (useJSON && value !== undefined) {
      editorStateFromJSON(value as LexicalSerializedEditorState)(editor)
    }
  }, [editor, value, format])

  return null
}

export function RichTextEditor({
  value,
  defaultValue,
  format = "auto",
  onChange,
  placeholder = "Type something...",
  disabled,
  className,
  minHeight = 160,
  toolbar = true,
}: RichTextEditorProps) {
  const initialEditorState = React.useCallback(
    (editor: LexicalEditor) => {
      const val = value ?? defaultValue
      if (val === undefined) return
      const useHTML = format === "html" || (format === "auto" && typeof val === "string")
      if (useHTML && typeof val === "string") {
        editorStateFromHTML(val)(editor)
      } else {
        editorStateFromJSON(val as LexicalSerializedEditorState)(editor)
      }
    },
    [value, defaultValue, format]
  )

  const initialConfig = React.useMemo(
    () => ({
      namespace: "@workspace/ui:rich-text-editor",
      theme: richTextEditorTheme,
      onError(error: Error) {
        // eslint-disable-next-line no-console
        console.error("Lexical error:", error)
      },
      nodes: [HeadingNode, ListNode, LinkNode, CodeNode, CodeHighlightNode],
      editorState: initialEditorState,
    }),
    [initialEditorState]
  )

  return (
    <div data-slot="rich-text-editor" className={cn("flex flex-col gap-2", className)}>
      {toolbar && (
        <RichTextToolbar className="border-input bg-background" />
      )}
      <div className={cn("border rounded-md bg-transparent", disabled && "opacity-90")}>        
        <LexicalComposer initialConfig={initialConfig}>
          <EditableController disabled={disabled} />
          <ApplyValue value={value} format={format} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[var(--editor-min-height,160px)] w-full px-3 py-2 text-base md:text-sm outline-none"
                style={{ ['--editor-min-height' as any]: `${minHeight}px` }}
              />
            }
            placeholder={<div className="px-3 py-2 text-muted-foreground select-none">{placeholder}</div>}
            ErrorBoundary={LexicalErrorBoundary as any}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightingPlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              if (!onChange) return
              onChange(snapshot(editor))
            }}
          />
        </LexicalComposer>
      </div>
    </div>
  )
}

export default RichTextEditor
