export const sectionsCodeSnippets: Record<string, string> = {
  "hero-centered": `import { HeroCentered } from "@/components/sections/landing/hero-centered"

<HeroCentered
  badge="New Release"
  title="Build Better Products Faster"
  description="A comprehensive UI component library with 100+ pre-built sections."
  primaryCta={{ text: "Get Started", href: "#" }}
  secondaryCta={{ text: "Learn More", href: "#" }}
  stats={[
    { value: "100+", label: "Components" },
    { value: "50K+", label: "Downloads" },
    { value: "4.9/5", label: "Rating" },
    { value: "24/7", label: "Support" },
  ]}
/>`,

  "hero-split": `import { HeroSplit } from "@/components/sections/landing/hero-split"

<HeroSplit
  badge="Introducing"
  title="Ship Your Product 10x Faster"
  description="Pre-built components designed to help you launch faster."
  features={[
    "100+ responsive components",
    "Dark mode support",
    "TypeScript & React",
    "Production ready code"
  ]}
  primaryCta={{ text: "Get Started", href: "#" }}
  secondaryCta={{ text: "View Demo", href: "#" }}
  imageSrc="/hero-image.png"
/>`,

  "features-grid": `import { FeaturesGrid } from "@/components/sections/landing/features-grid"
import { Rocket, Shield, Zap } from "lucide-react"

<FeaturesGrid
  title="Everything You Need"
  description="All the tools to build amazing products"
  columns={3}
  features={[
    {
      icon: Rocket,
      title: "Fast Performance",
      description: "Optimized for speed"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Built with security in mind"
    },
    {
      icon: Zap,
      title: "Easy Integration",
      description: "Simple setup"
    }
  ]}
/>`,

  "features-bento": `import { FeaturesBento } from "@/components/sections/landing/features-bento"
import { Rocket, Shield } from "lucide-react"

<FeaturesBento
  title="Powerful Features"
  features={[
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Optimized for performance",
      span: "col-span-1"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security",
      span: "col-span-2"
    }
  ]}
/>`,

  testimonials: `import { TestimonialsGrid } from "@/components/sections/landing/testimonials-grid"

<TestimonialsGrid
  title="What Our Customers Say"
  testimonials={[
    {
      content: "This saved us months of development time!",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp",
      rating: 5
    }
  ]}
/>`,

  pricing: `import { PricingTiers } from "@/components/sections/landing/pricing-tiers"

<PricingTiers
  title="Simple Pricing"
  tiers={[
    {
      name: "Starter",
      description: "For side projects",
      price: "$29",
      period: "month",
      features: ["50 components", "Basic support"],
      cta: { text: "Get Started", href: "#" }
    }
  ]}
/>`,

  "cta-simple": `import { CTASimple } from "@/components/sections/landing/cta-simple"

<CTASimple
  title="Ready to Get Started?"
  description="Join thousands of developers building amazing products."
  primaryCta={{ text: "Start Free Trial", href: "#" }}
  secondaryCta={{ text: "View Docs", href: "#" }}
/>`,

  "logo-cloud": `import { LogoCloud } from "@/components/sections/landing/logo-cloud"

<LogoCloud
  title="Trusted by leading companies"
  logos={[
    { name: "Company 1", src: "/logo1.png" },
    { name: "Company 2", src: "/logo2.png" }
  ]}
/>`,

  faq: `import { FAQAccordion } from "@/components/sections/landing/faq-accordion"

<FAQAccordion
  title="Frequently Asked Questions"
  faqs={[
    {
      question: "How do I get started?",
      answer: "Install via npm and follow our guide."
    }
  ]}
/>`,

  newsletter: `import { NewsletterInline } from "@/components/sections/landing/newsletter-inline"

<NewsletterInline
  title="Stay in the Loop"
  description="Get updates delivered to your inbox."
  placeholder="Enter your email"
  buttonText="Subscribe"
/>`,

  "stats-cards": `import { StatsCards } from "@/components/sections/dashboard/stats-cards"
import { DollarSign, Users } from "lucide-react"

<StatsCards
  stats={[
    {
      title: "Total Revenue",
      value: "$45,231",
      change: 20.1,
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: 15.3,
      icon: Users
    }
  ]}
/>`,

  "analytics-chart": `import { AnalyticsChart } from "@/components/sections/dashboard/analytics-chart"

<AnalyticsChart
  title="Monthly Revenue"
  description="Revenue over last 6 months"
  data={[
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 }
  ]}
  dataKey="value"
/>`,

  "data-table": `import { DataTableAdvanced } from "@/components/sections/dashboard/data-table-advanced"

<DataTableAdvanced
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role" }
  ]}
  data={[
    { name: "John", email: "john@example.com", role: "Admin" }
  ]}
  searchable={true}
/>`,

  "activity-feed": `import { ActivityFeed } from "@/components/sections/dashboard/activity-feed"
import { UserPlus } from "lucide-react"

<ActivityFeed
  title="Recent Activity"
  activities={[
    {
      icon: UserPlus,
      title: "New user registered",
      description: "Sarah joined the platform",
      timestamp: "2 minutes ago",
      type: "success"
    }
  ]}
/>`,

  "progress-cards": `import { ProgressCards } from "@/components/sections/dashboard/progress-cards"

<ProgressCards
  title="Projects"
  projects={[
    {
      title: "Website Redesign",
      progress: 75,
      status: "on-track",
      description: "Landing page updates",
      team: ["JD", "SM"]
    }
  ]}
/>`,

  "user-table": `import { UserTable } from "@/components/sections/dashboard/user-table"

<UserTable
  users={[
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago"
    }
  ]}
  onEdit={(user) => console.log("Edit", user)}
  onDelete={(user) => console.log("Delete", user)}
/>`,

  "file-manager": `import { FileManager } from "@/components/sections/dashboard/file-manager"

<FileManager
  files={[
    {
      name: "Project.pdf",
      type: "document",
      size: "2.4 MB",
      date: "2 days ago"
    }
  ]}
  onDownload={(file) => console.log("Download", file)}
/>`,

  "social-proof": `import { SocialProof } from "@/components/sections/marketing/social-proof"

<SocialProof
  stats={{
    users: "10,000+",
    rating: "4.9/5",
    reviews: "2,500+",
    awards: "15+"
  }}
/>`,

  "comparison-table": `import { ComparisonTable } from "@/components/sections/marketing/comparison-table"

<ComparisonTable
  title="See How We Compare"
  ourProduct="Our Product"
  competitors={["Competitor A", "Competitor B"]}
  features={[
    { name: "Feature 1", us: true, competitor1: false, competitor2: true },
    { name: "Feature 2", us: true, competitor1: true, competitor2: false }
  ]}
/>`,

  "team-grid": `import { TeamGrid } from "@/components/sections/marketing/team-grid"

<TeamGrid
  title="Meet Our Team"
  description="The people behind our success"
  members={[
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "10+ years in product design",
      initials: "AM"
    }
  ]}
/>`,

  "process-steps": `import { ProcessSteps } from "@/components/sections/marketing/process-steps"
import { Target, Rocket } from "lucide-react"

<ProcessSteps
  title="How It Works"
  description="Get started in three steps"
  steps={[
    {
      icon: Target,
      title: "Choose Your Plan",
      description: "Select the perfect plan"
    },
    {
      icon: Rocket,
      title: "Start Building",
      description: "Use components in your project"
    }
  ]}
/>`,

  "stats-section": `import { StatsSection } from "@/components/sections/marketing/stats-section"
import { Users, Award } from "lucide-react"

<StatsSection
  title="Our Impact"
  stats={[
    {
      icon: Users,
      value: "50K+",
      label: "Happy Users",
      description: "Across 120 countries"
    },
    {
      icon: Award,
      value: "15+",
      label: "Awards Won"
    }
  ]}
/>`,

  "contact-form": `import { ContactForm } from "@/components/sections/marketing/contact-form"

<ContactForm
  title="Get in Touch"
  description="Fill out the form and we'll get back to you."
  contactInfo={{
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA"
  }}
/>`,

  "trust-badges": `import { TrustBadges } from "@/components/sections/marketing/trust-badges"
import { Shield, Lock } from "lucide-react"

<TrustBadges
  badges={[
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level security"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is protected"
    }
  ]}
/>`,
}
