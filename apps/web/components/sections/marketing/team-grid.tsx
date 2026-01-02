import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
}

interface TeamGridProps {
  title: string
  description?: string
  members: TeamMember[]
}

export function TeamGrid({ title, description, members }: TeamGridProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl mb-4">{title}</h2>
          {description && <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((member, idx) => (
            <Card key={idx}>
              <CardContent className="p-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">
                  {member.role}
                </Badge>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
