export const codeSnippets: Record<string, string> = {
  "hero-section": `import { HeroSectionComponent } from "@/components/sections/hero-section-component"
import { Play } from "lucide-react"

export default function Hero() {
  return (
    <HeroSectionComponent
      badge={{
        text: "New Release",
        animated: true,
      }}
      title="Build beautiful interfaces"
      accentText="at scale"
      description="A comprehensive UI template system with everything you need."
      buttons={[
        {
          label: "Get Started",
          href: "/get-started",
        },
        {
          label: "View Demo",
          href: "/demo",
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
  )
}`,

  "features-section": `import { FeaturesSectionComponent } from "@/components/sections/features-section-component"
import { Palette, Layers, Zap, Shield, Code2, Smartphone } from "lucide-react"

export default function Features() {
  return (
    <FeaturesSectionComponent
      heading="Everything you need to build"
      subheading="A complete toolkit for modern web applications."
      features={[
        {
          icon: Palette,
          title: "Flexible Theming",
          description: "Dark and light modes with customizable design tokens.",
        },
        {
          icon: Layers,
          title: "Component Library",
          description: "50+ production-ready components.",
        },
      ]}
    />
  )
}`,

  "showcase-section": `import { ShowcaseSectionComponent } from "@/components/sections/showcase-section-component"

export default function Showcase() {
  return (
    <ShowcaseSectionComponent
      heading="Explore our templates"
      items={[
        {
          title: "Dashboard Template",
          description: "Modern admin dashboard with analytics and charts.",
          image: "/modern-dashboard.png",
          href: "/dashboard",
        },
      ]}
    />
  )
}`,

  "cta-section": `import { CTASectionComponent } from "@/components/sections/cta-section-component"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <CTASectionComponent
      title="Ready to get started?"
      description="Join thousands of developers building with our template."
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
  )
}`,

  "primary-button": `import { Button } from "@workspace/ui/components/button"

export default function PrimaryButton() {
  return <Button>Click me</Button>
}`,

  "secondary-button": `import { Button } from "@workspace/ui/components/button"

export default function SecondaryButton() {
  return <Button variant="secondary">Secondary</Button>
}`,

  "destructive-button": `import { Button } from "@workspace/ui/components/button"

export default function DestructiveButton() {
  return <Button variant="destructive">Delete</Button>
}`,

  "outline-button": `import { Button } from "@workspace/ui/components/button"

export default function OutlineButton() {
  return <Button variant="outline">Outline</Button>
}`,

  "ghost-button": `import { Button } from "@workspace/ui/components/button"

export default function GhostButton() {
  return <Button variant="ghost">Ghost</Button>
}`,

  "link-button": `import { Button } from "@workspace/ui/components/button"

export default function LinkButton() {
  return <Button variant="link">Link</Button>
}`,

  "icon-button": `import { Button } from "@workspace/ui/components/button"
import { Mail } from "lucide-react"

export default function IconButton() {
  return (
    <Button>
      <Mail className="mr-2 h-4 w-4" />
      Login with Email
    </Button>
  )
}`,

  "loading-button": `import { Button } from "@workspace/ui/components/button"
import { Loader2 } from "lucide-react"

export default function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}`,
};
