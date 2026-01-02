import { Play } from "lucide-react"
import { HeroSectionComponent } from "@/components/sections/hero-section-component"

export function HeroSection() {
  return (
    <HeroSectionComponent
      badge={{
        text: "Production-Ready Full-Stack DevKit",
        animated: true,
      }}
      title="Website Development DevKit"
      accentText="Monorepo Architecture"
      description="A production-ready full-stack development kit with Turborepo, Next.js, Hono API, and Mastra AI. Everything you need to build modern, scalable web applications with maximum productivity."
      buttons={[
        {
          label: "Explore Components",
          href: "/components",
        },
        {
          label: "View Documentation",
          href: "/docs",
          icon: Play,
          variant: "outline",
        },
      ]}
      stats={[
        { value: "4", label: "Tech Stack" },
        { value: "Edge-Ready", label: "Performance" },
        { value: "AI-Powered", label: "Workflows" },
        { value: "TypeScript", label: "Type Safe" },
      ]}
      showGrid={true}
    />
  )
}
