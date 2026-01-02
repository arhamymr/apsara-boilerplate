"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocSection {
  id: string
  title: string
  badge?: string
}

const sections: DocSection[] = [
  { id: "quick-start", title: "Quick Start" },
  { id: "project-structure", title: "Project Structure" },
  { id: "features", title: "Key Features" },
  { id: "examples", title: "React Query Examples" },
  { id: "authentication", title: "Authentication", badge: "New" },
  { id: "best-practices", title: "Best Practices" },
  { id: "deployment", title: "Deployment" },
]

export function DocsSidebar() {
  const [activeSection, setActiveSection] = useState("quick-start")

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(id)
    }
  }

  const SidebarContent = () => (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold">Documentation</h2>
      </div>
      <div className="space-y-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "secondary" : "ghost"}
            className={cn("w-full justify-start", activeSection === section.id && "bg-secondary font-medium")}
            onClick={() => handleScrollTo(section.id)}
          >
            {section.title}
            {section.badge && (
              <Badge variant="secondary" className="ml-auto">
                {section.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ScrollArea className="h-full py-6 px-3">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 sticky top-20 h-[calc(100vh-5rem)] border-r border-border/40">
        <ScrollArea className="h-full py-6 px-3">
          <SidebarContent />
        </ScrollArea>
      </aside>
    </>
  )
}
