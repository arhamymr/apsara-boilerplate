import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { registerCodeHighlighting } from "@lexical/code"

function CodeHighlightingPlugin() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    if (!editor) return
    return registerCodeHighlighting(editor)
  }, [editor])

  return null
}

export { CodeHighlightingPlugin }
