import * as React from "react"
import { Bold, Italic, Underline, Code, Link as LinkIcon, List, ListOrdered, Heading1, Heading2, Heading3, Undo, Redo } from "lucide-react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical"
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export type RichTextToolbarProps = {
  className?: string
}

function RichTextToolbar({ className }: RichTextToolbarProps) {
  const [editor] = useLexicalComposerContext()

  const applyHeading = (tag: HeadingTagType | "paragraph") => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (tag === "paragraph") {
          $setBlocksType(selection, () => $createParagraphNode())
        } else {
          $setBlocksType(selection, () => $createHeadingNode(tag))
        }
      }
    })
  }

  const toggleLink = () => {
    const url = window.prompt("Enter URL (leave empty to remove link)")
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, rel: "noopener", target: "_blank" })
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }

  return (
    <div data-slot="rich-text-toolbar" className={cn("flex items-center gap-1 p-1 border rounded-md bg-background", className)}>
      <Button aria-label="Bold" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <Bold />
      </Button>
      <Button aria-label="Italic" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <Italic />
      </Button>
      <Button aria-label="Underline" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        <Underline />
      </Button>
      <Button aria-label="Inline code" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}>
        <Code />
      </Button>

      <span className="mx-1 h-5 w-px bg-input" />

      <Button aria-label="Heading 1" variant="ghost" size="icon-sm" onClick={() => applyHeading("h1")}>
        <Heading1 />
      </Button>
      <Button aria-label="Heading 2" variant="ghost" size="icon-sm" onClick={() => applyHeading("h2")}>
        <Heading2 />
      </Button>
      <Button aria-label="Heading 3" variant="ghost" size="icon-sm" onClick={() => applyHeading("h3")}>
        <Heading3 />
      </Button>

      <Button aria-label="Paragraph" variant="ghost" size="icon-sm" onClick={() => applyHeading("paragraph")}>P</Button>

      <span className="mx-1 h-5 w-px bg-input" />

      <Button aria-label="Bulleted list" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <List />
      </Button>
      <Button aria-label="Numbered list" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <ListOrdered />
      </Button>
      <Button aria-label="Remove list" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}>
        <List className="opacity-50" />
      </Button>

      <span className="mx-1 h-5 w-px bg-input" />

      <Button aria-label="Link" variant="ghost" size="icon-sm" onClick={toggleLink}>
        <LinkIcon />
      </Button>

      <span className="mx-1 h-5 w-px bg-input" />

      <Button aria-label="Undo" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        <Undo />
      </Button>
      <Button aria-label="Redo" variant="ghost" size="icon-sm" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        <Redo />
      </Button>
    </div>
  )
}

export { RichTextToolbar }
