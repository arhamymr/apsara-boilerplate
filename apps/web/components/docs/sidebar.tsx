import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export type DocsSection = { id: string; label: string }
export type DocsSidebarProps = { sections: DocsSection[]; title?: string; className?: string }

export function DocsSidebar({ sections, title = "Documentation", className }: DocsSidebarProps) {
  return (
    <Sidebar
      aria-label="Documentation navigation"
      data-slot="docs-sidebar"
      className={cn(className)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((s) => (
                <SidebarMenuItem key={s.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`#${s.id}`}>{s.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DocsSidebar
