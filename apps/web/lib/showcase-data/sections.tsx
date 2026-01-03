import type * as React from "react"
import { HeroSectionComponent } from "@/components/sections/hero-section-component"
import { FeaturesSectionComponent } from "@/components/sections/features-section-component"
import { ShowcaseSectionComponent } from "@/components/sections/showcase-section-component"
import { CTASectionComponent } from "@/components/sections/cta-section-component"
import { Play, Bold, Layers, Zap, Shield, Code2, LayoutGrid, ArrowRight } from "lucide-react"
import type { ComponentShowcase } from "../types"

export const sectionsData: ComponentShowcase[] = [
  {
    id: "hero-section",
    category: "sections",
    title: "Hero Section",
    description: "Full-width hero section with badge, title, description, CTA buttons, and stats grid.",
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
    description: "Grid of feature cards with icons, titles, and descriptions.",
    component: (
      <div className="w-full -mx-4 sm:-mx-6">
        <FeaturesSectionComponent
          heading="Everything you need to build"
          subheading="A complete toolkit for building modern web applications with pre-built components and flexible design tokens."
          features={[
            {
              icon: Bold,
              title: "Flexible Theming",
              description: "Support for dark and light modes with customizable colors, typography, and spacing scales.",
            },
            {
              icon: Layers,
              title: "Component Library",
              description: "50+ production-ready components built with accessibility and performance in mind.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Optimized for performance with lazy loading, code splitting, and minimal bundle sizes.",
            },
            {
              icon: Shield,
              title: "Type Safe",
              description: "Built with TypeScript for better developer experience and fewer runtime errors.",
            },
            {
              icon: Code2,
              title: "Easy to Customize",
              description: "Clean, well-documented code that's easy to extend and customize for your needs.",
            },
            {
              icon: LayoutGrid,
              title: "Fully Responsive",
              description: "Every component works perfectly on desktop, tablet, and mobile devices.",
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
    description: "Grid layout showcasing templates with images and descriptions.",
    component: (
      <div className="w-full -mx-4 sm:-mx-6">
        <ShowcaseSectionComponent
          heading="Explore our templates"
          items={[
            {
              title: "Dashboard Template",
              description: "Modern admin dashboard with analytics and charts.",
              image: "/modern-dashboard.png",
              href: "/dashboard",
            },
            {
              title: "Component Library",
              description: "Complete UI component library with documentation.",
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
    description: "Call-to-action section with heading, description, and action buttons.",
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
]
