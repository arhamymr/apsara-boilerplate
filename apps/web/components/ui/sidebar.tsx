import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export type SidebarProps = React.ComponentProps<"aside">
export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      data-slot="ui-sidebar"
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r bg-background",
        className,
      )}
      {...props}
    />
  )
}

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>
export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="ui-sidebar-content"
      className={cn("px-3 py-2", className)}
      {...props}
    />
  )
}

export type SidebarGroupProps = React.HTMLAttributes<HTMLDivElement>
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-slot="ui-sidebar-group"
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

export type SidebarGroupLabelProps = React.HTMLAttributes<HTMLHeadingElement>
export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <h2
      data-slot="ui-sidebar-group-label"
      className={cn("px-2 text-sm font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

export type SidebarGroupContentProps = React.HTMLAttributes<HTMLDivElement>
export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div
      data-slot="ui-sidebar-group-content"
      className={cn("mt-2", className)}
      {...props}
    />
  )
}

export type SidebarMenuProps = React.ComponentProps<"ul">
export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="ui-sidebar-menu"
      className={cn("grid gap-1 list-none p-0 m-0", className)}
      {...props}
    />
  )
}

export type SidebarMenuItemProps = React.ComponentProps<"li">
export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="ui-sidebar-menu-item"
      className={cn("", className)}
      {...props}
    />
  )
}

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean
}
export function SidebarMenuButton({ asChild, className, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="ui-sidebar-menu-button"
      className={cn(
        "w-full rounded px-2 py-1 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}
