import type * as React from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import type { ComponentShowcase } from "../types"

export const cardsData: ComponentShowcase[] = [
  {
    id: "simple-card",
    category: "cards",
    title: "Simple Card",
    description: "Basic card with title and description",
    component: (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "card-with-footer",
    category: "cards",
    title: "Card with Footer",
    description: "Card with action buttons in footer",
    component: (
      <Card>
        <CardHeader>
          <CardTitle>Featured Project</CardTitle>
          <CardDescription>Check out this amazing project</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    id: "card-with-image",
    category: "cards",
    title: "Card with Image",
    description: "Card featuring an image",
    component: (
      <Card className="overflow-hidden">
        <img
          src="/placeholder.svg?height=200&width=400"
          alt="Card image"
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle>Image Card</CardTitle>
          <CardDescription>A card with an image</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with image above</p>
        </CardContent>
      </Card>
    ),
  },
]
