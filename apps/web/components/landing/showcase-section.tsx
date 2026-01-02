import { ShowcaseSectionComponent } from "@/components/sections/showcase-section-component"

export function ShowcaseSection() {
  return (
    <ShowcaseSectionComponent
      heading="Monorepo Structure Ready"
      subheading="Organized architecture with Turborepo for scalable development."
      buttonText="View Documentation"
      buttonHref="/docs"
      items={[
        {
          title: "Apps Layer",
          description:
            "Next.js frontend, Hono API backend, and Mastra AI backend. All edge-ready and production optimized.",
          href: "/docs",
          image: "/modern-admin-dashboard-dark-theme.jpg",
        },
        {
          title: "Shared Packages",
          description: "UI components, auth logic, React Query setup, and shared configs. Reusable across all apps.",
          href: "/components",
          image: "/ui-component-library-showcase.jpg",
        },
        {
          title: "DX & Best Practices",
          description:
            "TypeScript everywhere, linting pre-configured, clean conventions. Minimal config, maximum productivity.",
          href: "/docs",
          image: "/modern-blog-layout-dark-theme.jpg",
        },
      ]}
    />
  )
}
