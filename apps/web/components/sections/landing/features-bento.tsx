import { Card, CardContent } from "@workspace/ui/components/card"
import type { LucideIcon } from "lucide-react"

interface BentoFeature {
  icon: LucideIcon
  title: string
  description: string
  span?: "col-span-1" | "col-span-2" | "row-span-2"
}

interface FeaturesBentoProps {
  title: string
  description?: string
  features: BentoFeature[]
}

export function FeaturesBento({ title, description, features }: FeaturesBentoProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className={feature.span || "col-span-1"}>
              <CardContent className="p-6 h-full flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
