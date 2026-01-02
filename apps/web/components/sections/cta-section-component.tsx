import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import type { LucideIcon } from "lucide-react"

interface CTAButton {
  label: string
  href: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  icon?: LucideIcon
}

interface CTASectionProps {
  title?: string
  heading?: string
  description: string
  primaryButton?: CTAButton
  secondaryButton?: CTAButton
  buttons?: CTAButton[]
  backgroundColor?: string
}

export function CTASectionComponent({
  title,
  heading,
  description,
  primaryButton,
  secondaryButton,
  buttons,
  backgroundColor = "bg-primary text-primary-foreground",
}: CTASectionProps) {
  const buttonsList = buttons || [
    ...(primaryButton ? [{ ...primaryButton, variant: primaryButton.variant || ("secondary" as const) }] : []),
    ...(secondaryButton ? [{ ...secondaryButton, variant: secondaryButton.variant || ("outline" as const) }] : []),
  ]

  const isDefaultBg = backgroundColor.includes("bg-primary")
  const displayHeading = title || heading || ""

  return (
    <section className={`py-20 md:py-32 ${backgroundColor}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl tracking-tight sm:text-4xl md:text-5xl max-w-2xl text-balance font-normal">
            {displayHeading}
          </h2>
          <p className={`text-lg max-w-xl ${isDefaultBg ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {buttonsList.map((button, index) => {
              const Icon = button.icon
              return (
                <Button
                  key={index}
                  size="lg"
                  variant={button.variant || (index === 0 ? "secondary" : "outline")}
                  className={`h-12 px-8 ${
                    isDefaultBg && button.variant === "outline"
                      ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                      : ""
                  }`}
                  asChild
                >
                  <Link href={button.href}>
                    {button.label}
                    {Icon && <Icon className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
