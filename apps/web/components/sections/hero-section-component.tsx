import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, type LucideIcon } from "lucide-react"

interface Stat {
  value: string
  label: string
}

interface HeroButton {
  label: string
  href: string
  icon?: LucideIcon
  variant?: "default" | "outline" | "secondary" | "ghost"
}

interface HeroSectionProps {
  badge?: {
    text: string
    animated?: boolean
  }
  title: string
  accentText?: string
  description: string
  buttons?: HeroButton[]
  stats?: Stat[]
  showGrid?: boolean
}

export function HeroSectionComponent({
  badge,
  title,
  accentText,
  description,
  buttons = [],
  stats = [],
  showGrid = true,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {showGrid && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
      )}

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {badge && (
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
              {badge.animated && <span className="mr-2 h-2 w-2 rounded-full bg-accent animate-pulse" />}
              {badge.text}
            </div>
          )}

          <h1 className="max-w-4xl text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance font-normal">
            {title}
            {accentText && <span className="text-accent"> {accentText}</span>}
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">{description}</p>

          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {buttons.map((button, index) => {
                const Icon = button.icon
                return (
                  <Button
                    key={index}
                    size="lg"
                    variant={button.variant || "default"}
                    className="h-12 px-8 bg-transparent"
                    asChild
                  >
                    <Link href={button.href}>
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {button.label}
                      {!Icon && index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                )
              })}
            </div>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-12 border-t mt-12 w-full max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
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
