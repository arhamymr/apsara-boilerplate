import { Shield, Lock, Award, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Badge {
  icon: LucideIcon
  title: string
  description: string
}

interface TrustBadgesProps {
  badges?: Badge[]
}

export function TrustBadges({ badges }: TrustBadgesProps) {
  const defaultBadges: Badge[] = [
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level security",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is protected",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Industry recognized",
    },
    {
      icon: Zap,
      title: "Fast Support",
      description: "24/7 assistance",
    },
  ]

  const displayBadges = badges || defaultBadges

  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {displayBadges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="font-semibold mb-1">{badge.title}</div>
              <div className="text-xs text-muted-foreground">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
