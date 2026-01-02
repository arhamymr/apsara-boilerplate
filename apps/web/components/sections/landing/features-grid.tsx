import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesGridProps {
  title: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeaturesGrid({ title, description, features, columns = 3 }: FeaturesGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <div className={`grid gap-6 ${gridCols[columns]} max-w-6xl mx-auto`}>
          {features.map((feature, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
