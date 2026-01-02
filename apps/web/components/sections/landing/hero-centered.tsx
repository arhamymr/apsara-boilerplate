import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { ArrowRight, Play } from "lucide-react"

interface HeroCenteredProps {
  badge?: string
  title: string
  description: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  stats?: { value: string; label: string }[]
}

export function HeroCentered({
  badge = "New Release",
  title,
  description,
  primaryCta = { text: "Get Started", href: "#" },
  secondaryCta = { text: "Learn More", href: "#" },
  stats,
}: HeroCenteredProps) {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {badge}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight lg:text-6xl mb-6">{title}</h1>
          <p className="text-pretty text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={secondaryCta.href}>
                <Play className="mr-2 h-4 w-4" />
                {secondaryCta.text}
              </a>
            </Button>
          </div>
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
