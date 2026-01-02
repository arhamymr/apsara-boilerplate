import { Star, TrendingUp, Users, Award } from "lucide-react"

interface SocialProofProps {
  stats?: {
    users?: string
    rating?: string
    reviews?: string
    awards?: string
  }
}

export function SocialProof({
  stats = {
    users: "10,000+",
    rating: "4.9/5",
    reviews: "2,500+",
    awards: "15+",
  },
}: SocialProofProps) {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.users}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.rating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.reviews}</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.awards}</div>
            <div className="text-sm text-muted-foreground">Awards Won</div>
          </div>
        </div>
      </div>
    </section>
  )
}
