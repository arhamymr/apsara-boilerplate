import * as React from "react"
import { DocsSidebar, type DocsSection } from "@/components/docs/sidebar"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { MainNav } from "@/components/navigation/main-nav"

export const sections: DocsSection[] = [
  { id: "overview", label: "Overview" },
  { id: "monorepo", label: "Monorepo & Turborepo" },
  { id: "apps-web", label: "App: Web (Next.js)" },
  { id: "apps-backend", label: "App: Backend (Hono)" },
  { id: "apps-ai", label: "App: AI (Mastra)" },
  { id: "apps-rust", label: "App: Rust Backend" },
  { id: "ui-components", label: "UI Components" },
  { id: "rich-text-editor", label: "Showcase: Text Editor" },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNav />
      <div data-slot="docs-layout" className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_200px] gap-6 py-6">
          <DocsSidebar sections={sections} />
          <main id="docs-content" aria-label="Documentation content" className="min-h-[60vh]">
            {children}
          </main>
          <TableOfContents sections={sections} />
        </div>
      </div>
    </>

  )
}
