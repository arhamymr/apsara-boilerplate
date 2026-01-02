"use client";

import type * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Switch } from "@workspace/ui/components/switch";
import { Slider } from "@workspace/ui/components/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { CalendarIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@workspace/ui/components/input-otp";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Bell,
  Bold,
  Italic,
  Layers,
  LayoutGrid,
  Mail,
  Underline,
  Clock,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
import { HeroSectionComponent } from "@/components/sections/hero-section-component";
import { FeaturesSectionComponent } from "@/components/sections/features-section-component";
import { ShowcaseSectionComponent } from "@/components/sections/showcase-section-component";
import { CTASectionComponent } from "@/components/sections/cta-section-component";
import { BlogGrid } from "@/components/examples/blog-grid";
import { DashboardOverview } from "@/components/examples/dashboard-overview";
import { AboutSection } from "@/components/examples/about-section";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Info } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Play } from "lucide-react";
import { Code2 } from "lucide-react";

export interface ComponentShowcase {
  id: string;
  category: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

const SCROLL_AREA_TAGS = Array.from({ length: 50 }).map(
  (_, i) => `Tag ${i + 1}`,
);

export function getComponentsData(): ComponentShowcase[] {
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  return [
    // Landing Sections
    {
      id: "hero-section",
      category: "sections",
      title: "Hero Section",
      description:
        "Full-width hero section with badge, title, description, CTA buttons, and stats grid.",
      component: (
        <div className="w-full -mx-4 sm:-mx-6">
          <HeroSectionComponent
            badge={{
              text: "UIKit for Enterprise",
              animated: true,
            }}
            title="Build beautiful interfaces"
            accentText="at scale"
            description="A comprehensive UI template system with pre-built components, dashboard layouts, and everything you need to ship modern web applications."
            buttons={[
              {
                label: "Explore Components",
                href: "/components",
              },
              {
                label: "View Dashboard",
                href: "/dashboard",
                icon: Play,
                variant: "outline",
              },
            ]}
            stats={[
              { value: "50+", label: "Components" },
              { value: "10+", label: "Templates" },
              { value: "100%", label: "Customizable" },
              { value: "Dark/Light", label: "Theme Support" },
            ]}
            showGrid={true}
          />
        </div>
      ),
    },
    {
      id: "features-section",
      category: "sections",
      title: "Features Section",
      description:
        "Grid of feature cards with icons, titles, and descriptions.",
      component: (
        <div className="w-full -mx-4 sm:-mx-6">
          <FeaturesSectionComponent
            heading="Everything you need to build"
            subheading="A complete toolkit for building modern web applications with pre-built components and flexible design tokens."
            features={[
              {
                icon: Bold,
                title: "Flexible Theming",
                description:
                  "Support for dark and light modes with customizable colors, typography, and spacing scales.",
              },
              {
                icon: Layers,
                title: "Component Library",
                description:
                  "50+ production-ready components built with accessibility and performance in mind.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Optimized for performance with lazy loading, code splitting, and minimal bundle sizes.",
              },
              {
                icon: Shield,
                title: "Type Safe",
                description:
                  "Built with TypeScript for better developer experience and fewer runtime errors.",
              },
              {
                icon: Code2,
                title: "Easy to Customize",
                description:
                  "Clean, well-documented code that's easy to extend and customize for your needs.",
              },
              {
                icon: LayoutGrid,
                title: "Fully Responsive",
                description:
                  "Every component works perfectly on desktop, tablet, and mobile devices.",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "showcase-section",
      category: "sections",
      title: "Showcase Section",
      description:
        "Grid layout showcasing templates with images and descriptions.",
      component: (
        <div className="w-full -mx-4 sm:-mx-6">
          <ShowcaseSectionComponent
            heading="Explore our templates"
            items={[
              {
                title: "Dashboard Template",
                description:
                  "Modern admin dashboard with analytics and charts.",
                image: "/modern-dashboard.png",
                href: "/dashboard",
              },
              {
                title: "Component Library",
                description:
                  "Complete UI component library with documentation.",
                image: "/diverse-ui-components.png",
                href: "/components",
              },
              {
                title: "Blog Template",
                description: "Clean and minimal blog layout with dark mode.",
                image: "/clean-minimalist-blog.png",
                href: "/blog",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "cta-section",
      category: "sections",
      title: "CTA Section",
      description:
        "Call-to-action section with heading, description, and action buttons.",
      component: (
        <div className="w-full -mx-4 sm:-mx-6">
          <CTASectionComponent
            title="Ready to get started?"
            description="Join thousands of developers building amazing applications with our template system."
            primaryButton={{
              label: "Start Building",
              href: "/get-started",
              icon: ArrowRight,
            }}
            secondaryButton={{
              label: "View Pricing",
              href: "/pricing",
            }}
          />
        </div>
      ),
    },

    // Buttons
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

    // Forms
    {
      id: "text-input",
      category: "forms",
      title: "Text Input",
      description: "Basic text input field with label",
      component: (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
      ),
    },
    {
      id: "textarea",
      category: "forms",
      title: "Textarea",
      description: "Multi-line text input",
      component: (
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here" />
        </div>
      ),
    },
    {
      id: "checkbox",
      category: "forms",
      title: "Checkbox",
      description: "Checkbox input with label",
      component: (
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      ),
    },
    {
      id: "switch",
      category: "forms",
      title: "Switch",
      description: "Toggle switch component",
      component: (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      ),
    },
    {
      id: "slider",
      category: "forms",
      title: "Slider",
      description: "Range slider input",
      component: (
        <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
      ),
    },
    {
      id: "select",
      category: "forms",
      title: "Select",
      description: "Dropdown select menu",
      component: (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "radio-group",
      category: "forms",
      title: "Radio Group",
      description: "Radio button group for single selection",
      component: (
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      id: "input-otp",
      category: "forms",
      title: "Input OTP",
      description: "One-time password input",
      component: (
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      ),
    },
    {
      id: "calendar",
      category: "forms",
      title: "Calendar",
      description: "Date picker calendar component",
      component: <CalendarIcon mode="single" className="rounded-md border" />,
    },

    // Cards
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

    // Overlays
    {
      id: "dialog",
      category: "overlays",
      title: "Dialog",
      description: "Modal dialog for content and actions",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "alert-dialog",
      category: "overlays",
      title: "Alert Dialog",
      description: "Alert dialog for critical actions",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "sheet",
      category: "overlays",
      title: "Sheet",
      description: "Side sheet overlay",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Sheet</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you{"'"}re
                done.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "drawer",
      category: "overlays",
      title: "Drawer",
      description: "Bottom drawer component",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Drawer</Button>
          </DialogTrigger>
          <DialogContent className="fixed bottom-0 left-0 right-0 max-h-full">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "popover",
      category: "overlays",
      title: "Popover",
      description: "Popover overlay",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "hover-card",
      category: "overlays",
      title: "Hover Card",
      description: "Hover card for rich previews",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </DialogTrigger>
          <DialogContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "context-menu",
      category: "overlays",
      title: "Context Menu",
      description: "Right-click context menu",
      component: (
        <Dialog>
          <DialogTrigger className="flex h-32 w-full items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Profile</h4>
              <p className="text-sm">Manage your profile settings.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Billing</h4>
              <p className="text-sm">
                View and manage your billing information.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Settings</h4>
              <p className="text-sm">Adjust your application settings.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Logout</h4>
              <p className="text-sm">End your session and log out.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "tooltip",
      category: "overlays",
      title: "Tooltip",
      description: "Tooltip on hover",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </DialogTrigger>
          <DialogContent>
            <p>Add to library</p>
          </DialogContent>
        </Dialog>
      ),
    },

    // Navigation
    {
      id: "dropdown",
      category: "navigation",
      title: "Dropdown Menu",
      description: "Dropdown menu with items",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Menu</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Profile</h4>
              <p className="text-sm">Manage your profile settings.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Settings</h4>
              <p className="text-sm">Adjust your application settings.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Logout</h4>
              <p className="text-sm">End your session and log out.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "tabs",
      category: "navigation",
      title: "Tabs",
      description: "Tabbed navigation",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Tabs</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Account</h4>
              <p className="text-sm">Make changes to your account here.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Password</h4>
              <p className="text-sm">Change your password here.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "accordion",
      category: "navigation",
      title: "Accordion",
      description: "Collapsible accordion menu",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Accordion</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Is it accessible?</h4>
              <p className="text-sm">
                Yes. It adheres to the WAI-ARIA design pattern.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Is it styled?</h4>
              <p className="text-sm">
                Yes. It comes with default styles that matches the other
                components.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "collapsible",
      category: "navigation",
      title: "Collapsible",
      description: "Collapsible content section",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Can I use this in my project?</Button>
          </DialogTrigger>
          <DialogContent>
            <p className="text-sm">
              Yes. Free to use for personal and commercial projects. No
              attribution required.
            </p>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "breadcrumb",
      category: "navigation",
      title: "Breadcrumb",
      description: "Breadcrumb navigation",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Breadcrumb</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Home</h4>
              <p className="text-sm">Navigate back to the home page.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Components</h4>
              <p className="text-sm">Explore our pre-built components.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Breadcrumb</h4>
              <p className="text-sm">Current page: Breadcrumb</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "pagination",
      category: "navigation",
      title: "Pagination",
      description: "Pagination controls",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Pagination</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Previous</h4>
              <p className="text-sm">Go to the previous page.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Page 1</h4>
              <p className="text-sm">Current page: 1</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Page 2</h4>
              <p className="text-sm">Current page: 2</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Page 3</h4>
              <p className="text-sm">Current page: 3</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Next</h4>
              <p className="text-sm">Go to the next page.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "menubar",
      category: "navigation",
      title: "Menubar",
      description: "Menu bar with dropdown menus",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Menubar</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">New Tab</h4>
              <p className="text-sm">Open a new tab.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">New Window</h4>
              <p className="text-sm">Open a new window.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Share</h4>
              <p className="text-sm">Share this page.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Print</h4>
              <p className="text-sm">Print this page.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "navigation-menu",
      category: "navigation",
      title: "Navigation Menu",
      description: "Complex navigation menu",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Navigation Menu</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Introduction</h4>
              <p className="text-sm">Learn about our template system.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Installation</h4>
              <p className="text-sm">How to install our components.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "command",
      category: "navigation",
      title: "Command",
      description: "Command menu with search",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Command Menu</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Calculator</h4>
              <p className="text-sm">Perform calculations.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Search Emoji</h4>
              <p className="text-sm">Find and insert emojis.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Calendar</h4>
              <p className="text-sm">Select dates from the calendar.</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },

    // Data Display
    {
      id: "table",
      category: "data-display",
      title: "Table",
      description: "Data table component",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Table</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Name</h4>
              <p className="text-sm">John Doe</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Email</h4>
              <p className="text-sm">john@example.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Role</h4>
              <p className="text-sm">Admin</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Name</h4>
              <p className="text-sm">Jane Smith</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Email</h4>
              <p className="text-sm">jane@example.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Role</h4>
              <p className="text-sm">User</p>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "badge",
      category: "data-display",
      title: "Badge",
      description: "Status or category badge",
      component: (
        <div className="flex gap-2">
          <div className="bg-primary text-primary-foreground rounded px-2 py-1">
            Default
          </div>
          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1">
            Secondary
          </div>
          <div className="bg-destructive text-destructive-foreground rounded px-2 py-1">
            Destructive
          </div>
          <div className="bg-outline text-outline-foreground rounded px-2 py-1">
            Outline
          </div>
        </div>
      ),
    },
    {
      id: "avatar",
      category: "data-display",
      title: "Avatar",
      description: "User avatar with fallback",
      component: (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
          <span className="font-semibold text-sm">CN</span>
        </div>
      ),
    },

    // Feedback
    {
      id: "progress",
      category: "feedback",
      title: "Progress",
      description: "Progress bar",
      component: (
        <div className="w-full">
          <div className="bg-primary rounded h-2 w-[60%]"></div>
        </div>
      ),
    },
    {
      id: "skeleton",
      category: "feedback",
      title: "Skeleton",
      description: "Loading skeleton",
      component: (
        <div className="w-full">
          <div className="bg-muted rounded h-4 w-[250px] mb-2"></div>
          <div className="bg-muted rounded h-4 w-[200px]"></div>
        </div>
      ),
    },
    {
      id: "alert",
      category: "feedback",
      title: "Alert",
      description: "Alert message",
      component: (
        <div className="flex items-center gap-2">
          <div className="bg-destructive text-destructive-foreground rounded p-2">
            <Bell className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Heads up!</h4>
            <p className="text-sm">
              You can add components to your app using the cli.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "info-alert",
      category: "feedback",
      title: "Info Alert",
      description: "Informational alert",
      component: (
        <div className="flex items-center gap-2">
          <div className="bg-secondary text-secondary-foreground rounded p-2">
            <Info className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Information</h4>
            <p className="text-sm">This is an informational message.</p>
          </div>
        </div>
      ),
    },
    {
      id: "destructive-alert",
      category: "feedback",
      title: "Destructive Alert",
      description: "Error or warning alert",
      component: (
        <div className="flex items-center gap-2">
          <div className="bg-destructive text-destructive-foreground rounded p-2">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Error</h4>
            <p className="text-sm">
              Your session has expired. Please log in again.
            </p>
          </div>
        </div>
      ),
    },

    // Layout
    {
      id: "aspect-ratio",
      category: "layout",
      title: "Aspect Ratio",
      description: "Container with fixed aspect ratio",
      component: (
        <div className="w-[450px]">
          <div className="bg-muted rounded-lg h-[225px] w-full"></div>
        </div>
      ),
    },
    {
      id: "separator",
      category: "layout",
      title: "Separator",
      description: "Visual divider",
      component: (
        <div className="w-full">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <div className="bg-muted h-px my-4"></div>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <div className="bg-muted h-px w-px my-2 mx-4"></div>
            <div>Docs</div>
            <div className="bg-muted h-px w-px my-2 mx-4"></div>
            <div>Source</div>
          </div>
        </div>
      ),
    },
    {
      id: "scroll-area",
      category: "layout",
      title: "Scroll Area",
      description: "Scrollable container",
      component: (
        <div className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {SCROLL_AREA_TAGS.map((tag, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm">{tag}</div>
                <div className="bg-muted h-px my-2"></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "resizable",
      category: "layout",
      title: "Resizable",
      description: "Resizable panel layout",
      component: (
        <div className="min-h-[200px] rounded-lg border flex">
          <div className="bg-primary text-primary-foreground flex h-full items-center justify-center p-6 grow">
            <span className="font-semibold">One</span>
          </div>
          <div className="bg-muted h-full w-1"></div>
          <div className="bg-secondary text-secondary-foreground flex h-full items-center justify-center p-6 grow">
            <span className="font-semibold">Two</span>
          </div>
        </div>
      ),
    },
    {
      id: "toggle",
      category: "layout",
      title: "Toggle",
      description: "Toggle button",
      component: (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
          <Bold className="h-4 w-4 text-primary-foreground" />
        </div>
      ),
    },
    {
      id: "toggle-group",
      category: "layout",
      title: "Toggle Group",
      description: "Group of toggle buttons",
      component: (
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex items-center justify-center w-10 h-10 rounded-full">
            <Bold className="h-4 w-4" />
          </div>
          <div className="bg-secondary text-secondary-foreground flex items-center justify-center w-10 h-10 rounded-full">
            <Italic className="h-4 w-4" />
          </div>
          <div className="bg-muted text-muted-foreground flex items-center justify-center w-10 h-10 rounded-full">
            <Underline className="h-4 w-4" />
          </div>
        </div>
      ),
    },

    // Auth Components
    {
      id: "login-form",
      category: "auth",
      title: "Login Form",
      description:
        "Complete login form with email, password, remember me, and forgot password link.",
      component: (
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      ),
    },
    {
      id: "register-form",
      category: "auth",
      title: "Register Form",
      description:
        "Registration form with name fields, email, password validation, and terms acceptance.",
      component: (
        <div className="w-full max-w-md mx-auto">
          <RegisterForm />
        </div>
      ),
    },
    {
      id: "forgot-password-form",
      category: "auth",
      title: "Forgot Password Form",
      description: "Password reset form with email input and success state.",
      component: (
        <div className="w-full max-w-md mx-auto">
          <ForgotPasswordForm />
        </div>
      ),
    },

    // Blog category components
    {
      id: "blog-grid",
      category: "blog",
      title: "Blog Grid",
      description:
        "Complete blog grid with featured post and article cards. Includes author info, categories, and read time.",
      component: (
        <div className="w-full">
          <BlogGrid />
        </div>
      ),
    },

    // Dashboard category components
    {
      id: "dashboard-overview",
      category: "dashboard",
      title: "Dashboard Overview",
      description:
        "Comprehensive dashboard with stats cards, usage table, activity feed, and project progress indicators.",
      component: (
        <div className="w-full">
          <DashboardOverview />
        </div>
      ),
    },

    // About category components
    {
      id: "about-section",
      category: "about",
      title: "About Section",
      description:
        "Full about page with hero, stats, core values, timeline, and CTA sections.",
      component: (
        <div className="w-full">
          <AboutSection />
        </div>
      ),
    },
  ];
}
