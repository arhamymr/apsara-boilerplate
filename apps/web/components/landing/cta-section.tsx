import { CTASectionComponent } from "@/components/sections/cta-section-component"

export function CTASection() {
  return (
    <CTASectionComponent
      heading="Fast project bootstrap. Scalable architecture. Easy to extend."
      description="Get started with the Website Development DevKit and ship your next project with production-ready defaults and minimal configuration."
      buttons={[
        {
          label: "Get Started",
          href: "/docs",
          variant: "secondary",
        },
        {
          label: "View Components",
          href: "/components",
          variant: "outline",
        },
      ]}
    />
  )
}
