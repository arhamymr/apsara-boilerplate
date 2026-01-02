"use client"
import { ComponentItem } from "./component-item"
import type { ComponentShowcase } from "@/lib/showcase-components-data"

interface ComponentGridProps {
  components: ComponentShowcase[]
  codeSnippets: Record<string, string>
  onRef?: (id: string, el: HTMLDivElement | null) => void
}

export function ComponentGrid({ components, codeSnippets, onRef }: ComponentGridProps) {
  return (
    <div className="space-y-12">
      {components.map((component) => (
        <ComponentItem key={component.id} component={component} code={codeSnippets[component.id] || ""} onRef={onRef} />
      ))}
    </div>
  )
}
