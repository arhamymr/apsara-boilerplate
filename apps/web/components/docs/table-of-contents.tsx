"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type TableOfContentsProps = {
  sections: { id: string; label: string }[]
  title?: string
  className?: string
}

export function TableOfContents({ sections, title = "On this page", className }: TableOfContentsProps) {
  return (
    <aside
      aria-label="Table of contents"
      data-slot="docs-toc"
      className={cn("sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l pl-3", className)}
    >
      <div className="px-3 py-2">
        <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
        <nav className="mt-2 grid gap-1">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="text-sm rounded px-2 py-1 hover:bg-muted"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default TableOfContents
