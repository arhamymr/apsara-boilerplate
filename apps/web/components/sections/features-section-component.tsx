import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  heading: string
  subheading: string
  features: Feature[]
  backgroundColor?: string
}

export function FeaturesSectionComponent({
  heading,
  subheading,
  features,
  backgroundColor = "bg-secondary/30",
}: FeaturesSectionProps) {
  return (
    <section className={`py-20 md:py-32 ${backgroundColor}`}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl tracking-tight sm:text-4xl mb-4 font-normal">{heading}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-accent/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
