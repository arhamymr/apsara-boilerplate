import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { CheckCircle2, Target, Heart, Zap, Shield } from "lucide-react"

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Components" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

const values = [
  { icon: Target, title: "Mission-Driven", description: "Building tools that empower developers" },
  { icon: Heart, title: "User-Centric", description: "Designed with real user needs in mind" },
  { icon: Zap, title: "Performance First", description: "Fast, efficient, and optimized" },
  { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security built-in" },
]

const timeline = [
  { year: "2024", title: "Global Expansion", description: "Reached 100+ countries worldwide" },
  { year: "2023", title: "Major Milestone", description: "Launched v3.0 with 200+ new components" },
  { year: "2022", title: "Series A Funding", description: "Raised $10M to accelerate growth" },
  { year: "2021", title: "Company Founded", description: "Started with a vision to simplify UI development" },
]

export function AboutSection() {
  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="mb-4">About Us</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Building the Future of Web Development
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            We are passionate about creating tools that help developers build better products faster. Our mission is to
            democratize access to world-class UI components and design systems.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button size="lg">Join Our Team</Button>
            <Button size="lg" variant="outline">
              Read Our Story
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center border-accent/20 hover:border-accent/50 transition-colors">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Values */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border-accent/20 hover:border-accent/50 transition-all hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <value.icon className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Our Journey</h2>
            <p className="text-muted-foreground">Milestones that shaped our story</p>
          </div>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  {index < timeline.length - 1 && <div className="h-full w-px bg-border mt-2" />}
                </div>
                <Card className="flex-1 border-accent/20">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="mb-2">
                      {item.year}
                    </Badge>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">Want to Learn More?</h2>
          <p className="text-muted-foreground">
            Join thousands of developers who trust our platform to build amazing products.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg">Get Started Free</Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
