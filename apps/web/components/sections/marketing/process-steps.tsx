import { Card, CardContent } from "@workspace/ui/components/card"
import type { LucideIcon } from "lucide-react"

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

interface ProcessStepsProps {
  title: string
  description?: string
  steps: Step[]
}

export function ProcessSteps({ title, description, steps }: ProcessStepsProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              <Card>
                <CardContent className="p-6 text-center relative">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 mt-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
