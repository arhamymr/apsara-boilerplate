import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface HeroSplitProps {
  badge?: string
  title: string
  description: string
  features?: string[]
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  imageSrc?: string
  imageAlt?: string
}

export function HeroSplit({
  badge = "Introducing",
  title,
  description,
  features = [],
  primaryCta = { text: "Get Started", href: "#" },
  secondaryCta = { text: "View Demo", href: "#" },
  imageSrc = "/placeholder.svg?height=600&width=800",
  imageAlt = "Hero image",
}: HeroSplitProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight lg:text-5xl mb-6">{title}</h1>
            <p className="text-pretty text-lg text-muted-foreground mb-6">{description}</p>
            {features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <a href={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={secondaryCta.href}>{secondaryCta.text}</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
