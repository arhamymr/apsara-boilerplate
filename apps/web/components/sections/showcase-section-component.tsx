import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

interface ShowcaseItem {
  title: string
  description: string
  href: string
  image: string
}

interface ShowcaseSectionProps {
  heading: string
  subheading: string
  buttonText?: string
  buttonHref?: string
  items: ShowcaseItem[]
}

export function ShowcaseSectionComponent({ heading, subheading, buttonText, buttonHref, items }: ShowcaseSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl tracking-tight sm:text-4xl mb-2 font-normal">{heading}</h2>
            <p className="text-lg text-muted-foreground">{subheading}</p>
          </div>
          {buttonText && buttonHref && (
            <Button variant="outline" asChild>
              <Link href={buttonHref}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block rounded-xl border overflow-hidden bg-card transition-all hover:shadow-lg hover:border-accent/50"
            >
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
