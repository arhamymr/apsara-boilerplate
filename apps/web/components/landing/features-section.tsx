import { Box, Zap, Code2, Sparkles, Database, Lock } from "lucide-react"
import { FeaturesSectionComponent } from "@/components/sections/features-section-component"

export function FeaturesSection() {
  return (
    <FeaturesSectionComponent
      heading="Core Features Pre-Made"
      subheading="Everything you need to ship fast. Authentication, data fetching, SEO optimization, and AI integration ready out of the box."
      features={[
        {
          icon: Lock,
          title: "Authentication",
          description:
            "Email & password login with OAuth ready support for Google/GitHub. Session & token based with shared auth package.",
        },
        {
          icon: Database,
          title: "Data Fetching",
          description:
            "React Query pre-configured with query keys convention, SSR/RSC friendly, and auto-typed API client.",
        },
        {
          icon: Zap,
          title: "SEO Friendly",
          description:
            "Meta tags, Open Graph, dynamic metadata support, sitemap & robots.txt. Fast page load with edge-ready rendering.",
        },
        {
          icon: Sparkles,
          title: "AI Integration",
          description:
            "Mastra workflows ready with prompt & agent abstraction. Secure API boundary between AI and your app.",
        },
        {
          icon: Code2,
          title: "TypeScript Everywhere",
          description:
            "Full type safety across frontend, backend, and AI layers. Shared env management and clean conventions.",
        },
        {
          icon: Box,
          title: "Monorepo Architecture",
          description:
            "Turborepo setup with separate apps for web, API, and AI. Shared packages for UI, config, auth, and queries.",
        },
      ]}
    />
  )
}
