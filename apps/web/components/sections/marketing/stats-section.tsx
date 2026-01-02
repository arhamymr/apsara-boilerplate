import type { LucideIcon } from "lucide-react"

interface Stat {
  icon: LucideIcon
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats: Stat[]
}

export function StatsSection({ title, description, stats }: StatsSectionProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>}
            {description && <p className="text-pretty text-lg opacity-90 max-w-2xl mx-auto">{description}</p>}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10 mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              {stat.description && <p className="text-sm opacity-80">{stat.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
