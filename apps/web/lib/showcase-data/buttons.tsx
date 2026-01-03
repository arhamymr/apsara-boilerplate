import type * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Mail, Clock } from "lucide-react"
import type { ComponentShowcase } from "../types"

export const buttonsData: ComponentShowcase[] = [
  {
    id: "primary-button",
    category: "buttons",
    title: "Primary Button",
    description: "A primary action button",
    component: <Button>Click me</Button>,
  },
  {
    id: "secondary-button",
    category: "buttons",
    title: "Secondary Button",
    description: "A secondary action button",
    component: <Button variant="secondary">Secondary</Button>,
  },
  {
    id: "destructive-button",
    category: "buttons",
    title: "Destructive Button",
    description: "For destructive actions like delete",
    component: <Button variant="destructive">Delete</Button>,
  },
  {
    id: "outline-button",
    category: "buttons",
    title: "Outline Button",
    description: "Button with outline style",
    component: <Button variant="outline">Outline</Button>,
  },
  {
    id: "ghost-button",
    category: "buttons",
    title: "Ghost Button",
    description: "Minimal ghost button style",
    component: <Button variant="ghost">Ghost</Button>,
  },
  {
    id: "link-button",
    category: "buttons",
    title: "Link Button",
    description: "Button styled as a link",
    component: <Button variant="link">Link</Button>,
  },
  {
    id: "icon-button",
    category: "buttons",
    title: "Button with Icon",
    description: "Button with an icon",
    component: (
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
    ),
  },
  {
    id: "loading-button",
    category: "buttons",
    title: "Loading Button",
    description: "Button in loading state",
    component: (
      <Button disabled>
        <Clock className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    ),
  },
]
