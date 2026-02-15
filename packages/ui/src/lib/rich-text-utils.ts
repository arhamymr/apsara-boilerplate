import type { LexicalEditor } from "lexical"
import { $getRoot } from "lexical"
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"

export type LexicalSerializedEditorState = unknown

export function editorStateFromHTML(html: string) {
  return (editor: LexicalEditor) => {
    editor.update(() => {
      // Guard against SSR where DOMParser is not available
      if (typeof window === "undefined" || typeof DOMParser === "undefined") {
        const root = $getRoot()
        root.clear()
        return
      }
      const parser = new DOMParser()
      const dom = parser.parseFromString(html, "text/html")
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()
      root.append(...nodes)
    })
  }
}

export function editorStateFromJSON(json: LexicalSerializedEditorState) {
  return (editor: LexicalEditor) => {
    const serialized = typeof json === "string" ? json : JSON.stringify(json)
    const state = editor.parseEditorState(serialized)
    editor.setEditorState(state)
  }
}

export function getHTML(editor: LexicalEditor) {
  let html = ""
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor)
  })
  return html
}

export function getJSON(editor: LexicalEditor): LexicalSerializedEditorState {
  const state = editor.getEditorState()
  return state.toJSON() as LexicalSerializedEditorState
}

export function snapshot(editor: LexicalEditor) {
  return {
    html: getHTML(editor),
    json: getJSON(editor),
  }
}
