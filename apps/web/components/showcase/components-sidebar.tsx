"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import type { ComponentShowcase } from "@/lib/showcase-components-data"

export const categories = [
  { id: "all", name: "All" },
  { id: "sections", name: "Landing Sections" },
  { id: "auth", name: "Authentication" },
  { id: "blog", name: "Blog" },
  { id: "dashboard", name: "Dashboard" },
  { id: "about", name: "About" },
  { id: "buttons", name: "Buttons" },
  { id: "forms", name: "Forms" },
  { id: "cards", name: "Cards" },
  { id: "overlays", name: "Overlays" },
  { id: "navigation", name: "Navigation" },
  { id: "data-display", name: "Data Display" },
  { id: "feedback", name: "Feedback" },
  { id: "layout", name: "Layout" },
]

interface ComponentsSidebarProps {
  components: ComponentShowcase[]
  activeComponent: string | null
  onSelect: (id: string) => void
  className?: string
}

export function ComponentsSidebar({ components, activeComponent, onSelect, className }: ComponentsSidebarProps) {
  const groupedComponents = React.useMemo(() => {
    const groups: Record<string, ComponentShowcase[]> = {}
    categories.slice(1).forEach((cat) => {
      groups[cat.id] = components.filter((c) => c.category === cat.id)
    })
    return groups
  }, [components])

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-4 space-y-4">
        {categories.slice(1).map((category, index) => (
          <div key={category.id}>
            {index > 0 && <Separator className="my-4" />}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">{category.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {groupedComponents[category.id]?.length || 0}
              </Badge>
            </div>
            <div className="space-y-1">
              {groupedComponents[category.id]?.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  variant={activeComponent === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sm font-normal",
                    activeComponent === item.id && "font-medium",
                  )}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
