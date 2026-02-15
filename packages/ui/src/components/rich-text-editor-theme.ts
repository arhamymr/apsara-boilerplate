
// Tailwind v4 classnames following the repository's design tokens
// Maps Lexical nodes/styles to CSS classes used by the editor
export const richTextEditorTheme = {
  paragraph: "leading-7 my-2",
  quote:
    "border-l-2 border-input pl-3 my-3 italic text-muted-foreground",
  heading: {
    h1: "text-2xl font-bold tracking-tight my-3",
    h2: "text-xl font-semibold tracking-tight my-2",
    h3: "text-lg font-semibold tracking-tight my-2",
    h4: "text-base font-semibold tracking-tight my-2",
    h5: "text-sm font-semibold tracking-tight my-2",
    h6: "text-xs font-semibold tracking-tight my-2",
  },
  list: {
    nested: {
      listitem: "my-1",
    },
    ol: "list-decimal pl-6 my-2",
    ul: "list-disc pl-6 my-2",
    listitem: "my-1",
  },
  link: "text-primary underline underline-offset-4 hover:text-primary/80",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code:
      "rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground",
  },
  code:
    "block rounded bg-muted p-3 font-mono text-sm overflow-auto text-foreground",
  codeHighlight: {
    // Minimal Prism token classes mapping; extend as needed
    atrule: "text-purple-500",
    attr: "text-blue-500",
    boolean: "text-orange-500",
    builtin: "text-fuchsia-500",
    cdata: "text-gray-400",
    char: "text-gray-50",
    class: "text-cyan-400",
    "class-name": "text-cyan-400",
    comment: "text-gray-400",
    constant: "text-fuchsia-500",
    deleted: "text-red-500",
    doctype: "text-gray-400",
    entity: "text-amber-500",
    function: "text-blue-400",
    important: "text-red-500",
    inserted: "text-emerald-500",
    keyword: "text-pink-500",
    namespace: "text-gray-400",
    number: "text-orange-500",
    operator: "text-gray-50",
    prolog: "text-gray-400",
    property: "text-emerald-400",
    punctuation: "text-gray-400",
    regex: "text-amber-500",
    selector: "text-emerald-400",
    string: "text-amber-500",
    symbol: "text-fuchsia-500",
    tag: "text-rose-500",
    url: "text-blue-400",
    variable: "text-sky-400",
  },
}

export default richTextEditorTheme
