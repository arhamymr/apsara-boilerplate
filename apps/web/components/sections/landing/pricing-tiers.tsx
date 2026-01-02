import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Check } from "lucide-react"

interface PricingTier {
  name: string
  description: string
  price: string
  period?: string
  popular?: boolean
  features: string[]
  cta: { text: string; href: string }
}

interface PricingTiersProps {
  title: string
  description?: string
  tiers: PricingTier[]
}

export function PricingTiers({ title, description, tiers }: PricingTiersProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <Card key={idx} className={tier.popular ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                {tier.popular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">/{tier.period}</span>}
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                  <a href={tier.cta.href}>{tier.cta.text}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
