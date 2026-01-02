import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

interface CTASimpleProps {
  title: string
  description: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export function CTASimple({
  title,
  description,
  primaryCta = { text: "Get Started", href: "#" },
  secondaryCta,
}: CTASimpleProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          <p className="text-pretty text-lg mb-8 opacity-90">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            {secondaryCta && (
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <a href={secondaryCta.href}>{secondaryCta.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
