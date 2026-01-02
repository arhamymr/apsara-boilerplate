"use client"
import { ComponentHeader } from "./component-header"
import { ComponentPreview } from "./component-preview"
import type { ComponentShowcase } from "@/lib/showcase-components-data"

interface ComponentItemProps {
  component: ComponentShowcase
  code: string
  onRef?: (id: string, el: HTMLDivElement | null) => void
}

export function ComponentItem({ component, code, onRef }: ComponentItemProps) {
  return (
    <div id={component.id} ref={(el) => onRef?.(component.id, el)} className="scroll-mt-20">
      <ComponentHeader title={component.title} category={component.category} description={component.description} />
      <ComponentPreview component={component.component} code={code} />
    </div>
  )
}
