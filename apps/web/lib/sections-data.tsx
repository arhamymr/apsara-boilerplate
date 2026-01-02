import type React from "react"
import { sectionsCodeSnippets } from "./sections-code-snippets"

// Landing
import { HeroCentered } from "@/components/sections/landing/hero-centered"
import { HeroSplit } from "@/components/sections/landing/hero-split"
import { FeaturesGrid } from "@/components/sections/landing/features-grid"
import { FeaturesBento } from "@/components/sections/landing/features-bento"
import { TestimonialsGrid } from "@/components/sections/landing/testimonials-grid"
import { PricingTiers } from "@/components/sections/landing/pricing-tiers"
import { CTASimple } from "@/components/sections/landing/cta-simple"
import { LogoCloud } from "@/components/sections/landing/logo-cloud"
import { FAQAccordion } from "@/components/sections/landing/faq-accordion"
import { NewsletterInline } from "@/components/sections/landing/newsletter-inline"

// Dashboard
import { StatsCards } from "@/components/sections/dashboard/stats-cards"
import { AnalyticsChart } from "@/components/sections/dashboard/analytics-chart"
import { DataTableAdvanced } from "@/components/sections/dashboard/data-table-advanced"
import { ActivityFeed } from "@/components/sections/dashboard/activity-feed"
import { ProgressCards } from "@/components/sections/dashboard/progress-cards"
import { UserTable } from "@/components/sections/dashboard/user-table"
import { FileManager } from "@/components/sections/dashboard/file-manager"

// Marketing
import { SocialProof } from "@/components/sections/marketing/social-proof"
import { ComparisonTable } from "@/components/sections/marketing/comparison-table"
import { TeamGrid } from "@/components/sections/marketing/team-grid"
import { ProcessSteps } from "@/components/sections/marketing/process-steps"
import { StatsSection } from "@/components/sections/marketing/stats-section"
import { ContactForm } from "@/components/sections/marketing/contact-form"
import { TrustBadges } from "@/components/sections/marketing/trust-badges"

import {
  Rocket,
  Zap,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
  Target,
  Clock,
  Globe,
  Award,
} from "lucide-react"

export interface SectionShowcase {
  id: string
  category: string
  title: string
  description: string
  component: React.ReactNode
  code: string
}

export const categories = [
  { value: "all", label: "All Sections" },
  { value: "landing", label: "Landing Sections" },
  { value: "dashboard", label: "Dashboard Sections" },
  { value: "marketing", label: "Marketing Sections" },
]

export function getSectionsData(): SectionShowcase[] {
  return [
    // Landing Sections
    {
      id: "hero-centered",
      category: "landing",
      title: "Hero Centered",
      description: "Centered hero section with stats and dual CTAs",
      component: (
        <HeroCentered
          badge="New Release"
          title="Build Better Products Faster"
          description="A comprehensive UI component library with 100+ pre-built sections ready to use in your next project."
          stats={[
            { value: "100+", label: "Components" },
            { value: "50K+", label: "Downloads" },
            { value: "4.9/5", label: "Rating" },
            { value: "24/7", label: "Support" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["hero-centered"],
    },
    {
      id: "hero-split",
      category: "landing",
      title: "Hero Split",
      description: "Split layout hero with image and feature list",
      component: (
        <HeroSplit
          title="Ship Your Product 10x Faster"
          description="Pre-built components and sections designed to help you launch faster with production-ready code."
          features={["100+ responsive components", "Dark mode support", "TypeScript & React", "Production ready code"]}
          imageSrc="/placeholder.svg?height=600&width=800"
        />
      ),
      code: sectionsCodeSnippets["hero-split"],
    },
    {
      id: "features-grid",
      category: "landing",
      title: "Features Grid",
      description: "Grid layout for showcasing features with icons",
      component: (
        <FeaturesGrid
          title="Everything You Need to Succeed"
          description="All the tools and components you need to build amazing products"
          features={[
            {
              icon: Rocket,
              title: "Fast Performance",
              description: "Optimized components for lightning-fast load times",
            },
            {
              icon: Shield,
              title: "Secure by Default",
              description: "Built with security best practices in mind",
            },
            {
              icon: Zap,
              title: "Easy Integration",
              description: "Simple setup and seamless integration",
            },
            {
              icon: Sparkles,
              title: "Modern Design",
              description: "Beautiful, accessible components",
            },
            { icon: Users, title: "Community Support", description: "Active community and regular updates" },
            { icon: Globe, title: "Global CDN", description: "Fast delivery worldwide" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["features-grid"],
    },
    {
      id: "features-bento",
      category: "landing",
      title: "Features Bento",
      description: "Bento grid layout for features with flexible sizing",
      component: (
        <FeaturesBento
          title="Powerful Features"
          features={[
            {
              icon: Rocket,
              title: "Lightning Fast",
              description: "Optimized for performance",
              span: "col-span-1",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Bank-level security standards",
              span: "col-span-2",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Work together seamlessly",
              span: "col-span-2",
            },
            { icon: Zap, title: "API Access", description: "Full API documentation", span: "col-span-1" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["features-bento"],
    },
    {
      id: "testimonials",
      category: "landing",
      title: "Testimonials Grid",
      description: "Customer testimonials in a grid layout",
      component: (
        <TestimonialsGrid
          title="What Our Customers Say"
          testimonials={[
            {
              content: "This component library saved us months of development time. Highly recommended!",
              author: "Sarah Johnson",
              role: "CTO",
              company: "TechCorp",
              rating: 5,
            },
            {
              content: "The best UI kit I've used. Clean code, great documentation, and beautiful designs.",
              author: "Mike Chen",
              role: "Lead Developer",
              company: "StartupXYZ",
              rating: 5,
            },
            {
              content:
                "Incredible attention to detail. Every component is thoughtfully designed and easy to customize.",
              author: "Emma Davis",
              role: "Product Designer",
              company: "DesignStudio",
              rating: 5,
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["testimonials"],
    },
    {
      id: "pricing",
      category: "landing",
      title: "Pricing Tiers",
      description: "Pricing table with feature comparison",
      component: (
        <PricingTiers
          title="Simple, Transparent Pricing"
          tiers={[
            {
              name: "Starter",
              description: "Perfect for side projects",
              price: "$29",
              period: "month",
              features: ["50 components", "Basic support", "Community access", "Updates"],
              cta: { text: "Get Started", href: "#" },
            },
            {
              name: "Pro",
              description: "For professional developers",
              price: "$99",
              period: "month",
              popular: true,
              features: ["All components", "Priority support", "Private Discord", "Lifetime updates", "Source files"],
              cta: { text: "Start Free Trial", href: "#" },
            },
            {
              name: "Enterprise",
              description: "For large teams",
              price: "$299",
              period: "month",
              features: ["Everything in Pro", "Custom components", "Dedicated support", "SLA guarantee", "White label"],
              cta: { text: "Contact Sales", href: "#" },
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["pricing"],
    },
    {
      id: "cta-simple",
      category: "landing",
      title: "CTA Simple",
      description: "Simple call-to-action section",
      component: (
        <CTASimple
          title="Ready to Get Started?"
          description="Join thousands of developers building amazing products with our component library."
          primaryCta={{ text: "Start Free Trial", href: "#" }}
          secondaryCta={{ text: "View Documentation", href: "#" }}
        />
      ),
      code: sectionsCodeSnippets["cta-simple"],
    },
    {
      id: "logo-cloud",
      category: "landing",
      title: "Logo Cloud",
      description: "Partner/client logo showcase",
      component: (
        <LogoCloud
          title="Trusted by leading companies"
          logos={[
            { name: "Company 1", src: "/placeholder.svg?height=40&width=120" },
            { name: "Company 2", src: "/placeholder.svg?height=40&width=120" },
            { name: "Company 3", src: "/placeholder.svg?height=40&width=120" },
            { name: "Company 4", src: "/placeholder.svg?height=40&width=120" },
            { name: "Company 5", src: "/placeholder.svg?height=40&width=120" },
            { name: "Company 6", src: "/placeholder.svg?height=40&width=120" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["logo-cloud"],
    },
    {
      id: "faq",
      category: "landing",
      title: "FAQ Accordion",
      description: "Frequently asked questions with accordion",
      component: (
        <FAQAccordion
          title="Frequently Asked Questions"
          faqs={[
            {
              question: "How do I get started?",
              answer: "Simply install the package via npm and follow our quick start guide in the documentation.",
            },
            {
              question: "Can I use this in commercial projects?",
              answer: "Yes! Our license allows you to use the components in any personal or commercial projects.",
            },
            {
              question: "Do you offer support?",
              answer:
                "We offer email support for all plans, with priority support available for Pro and Enterprise customers.",
            },
            {
              question: "Can I customize the components?",
              answer:
                "All components are fully customizable and come with detailed documentation on how to modify them.",
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["faq"],
    },
    {
      id: "newsletter",
      category: "landing",
      title: "Newsletter Inline",
      description: "Newsletter signup form",
      component: (
        <NewsletterInline
          title="Stay in the Loop"
          description="Get the latest updates, tips, and exclusive content delivered to your inbox."
        />
      ),
      code: sectionsCodeSnippets["newsletter"],
    },

    // Dashboard Sections
    {
      id: "stats-cards",
      category: "dashboard",
      title: "Stats Cards",
      description: "KPI cards with trend indicators",
      component: (
        <StatsCards
          stats={[
            { title: "Total Revenue", value: "$45,231", change: 20.1, icon: DollarSign },
            { title: "Active Users", value: "2,350", change: 15.3, icon: Users },
            { title: "Conversion Rate", value: "3.2%", change: -4.2, icon: TrendingUp },
            { title: "Avg. Session", value: "5m 32s", change: 8.1, icon: Activity },
          ]}
        />
      ),
      code: sectionsCodeSnippets["stats-cards"],
    },
    {
      id: "analytics-chart",
      category: "dashboard",
      title: "Analytics Chart",
      description: "Area chart for analytics data",
      component: (
        <AnalyticsChart
          title="Monthly Revenue"
          description="Your revenue over the last 6 months"
          data={[
            { name: "Jan", value: 4000 },
            { name: "Feb", value: 3000 },
            { name: "Mar", value: 5000 },
            { name: "Apr", value: 4500 },
            { name: "May", value: 6000 },
            { name: "Jun", value: 5500 },
          ]}
        />
      ),
      code: sectionsCodeSnippets["analytics-chart"],
    },
    {
      id: "data-table",
      category: "dashboard",
      title: "Advanced Data Table",
      description: "Sortable, searchable data table",
      component: (
        <DataTableAdvanced
          columns={[
            { key: "name", label: "Name", sortable: true },
            { key: "email", label: "Email", sortable: true },
            { key: "role", label: "Role", sortable: true },
            { key: "status", label: "Status" },
          ]}
          data={[
            { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
            { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
            { name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["data-table"],
    },
    {
      id: "activity-feed",
      category: "dashboard",
      title: "Activity Feed",
      description: "Timeline of recent activities",
      component: (
        <ActivityFeed
          activities={[
            {
              icon: UserPlus,
              title: "New user registered",
              description: "Sarah Johnson joined the platform",
              timestamp: "2 minutes ago",
              type: "success",
            },
            {
              icon: DollarSign,
              title: "Payment received",
              description: "$299 from Enterprise plan",
              timestamp: "1 hour ago",
              type: "success",
            },
            {
              icon: Activity,
              title: "Server alert",
              description: "High CPU usage detected",
              timestamp: "3 hours ago",
              type: "warning",
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["activity-feed"],
    },
    {
      id: "progress-cards",
      category: "dashboard",
      title: "Progress Cards",
      description: "Project progress tracking cards",
      component: (
        <ProgressCards
          projects={[
            {
              title: "Website Redesign",
              progress: 75,
              status: "on-track",
              description: "Landing page and about page",
              team: ["JD", "SM", "BJ"],
            },
            {
              title: "Mobile App Development",
              progress: 45,
              status: "at-risk",
              description: "iOS and Android native apps",
              team: ["AS", "KL"],
            },
            {
              title: "API Integration",
              progress: 90,
              status: "on-track",
              description: "Third-party service integration",
              team: ["MR"],
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["progress-cards"],
    },
    {
      id: "user-table",
      category: "dashboard",
      title: "User Table",
      description: "User management table with actions",
      component: (
        <UserTable
          users={[
            { name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastActive: "2 hours ago" },
            {
              name: "Jane Smith",
              email: "jane@example.com",
              role: "Editor",
              status: "active",
              lastActive: "5 minutes ago",
            },
            {
              name: "Bob Johnson",
              email: "bob@example.com",
              role: "Viewer",
              status: "inactive",
              lastActive: "2 days ago",
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["user-table"],
    },
    {
      id: "file-manager",
      category: "dashboard",
      title: "File Manager",
      description: "File management grid with download actions",
      component: (
        <FileManager
          files={[
            { name: "Project Proposal.pdf", type: "document", size: "2.4 MB", date: "2 days ago" },
            { name: "Hero Banner.png", type: "image", size: "1.8 MB", date: "1 week ago" },
            { name: "Product Demo.mp4", type: "video", size: "45.2 MB", date: "3 days ago" },
            { name: "Podcast Episode.mp3", type: "audio", size: "12.5 MB", date: "5 days ago" },
            { name: "Annual Report.pdf", type: "document", size: "3.1 MB", date: "1 month ago" },
            { name: "Team Photo.jpg", type: "image", size: "4.2 MB", date: "2 weeks ago" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["file-manager"],
    },

    // Marketing Sections
    {
      id: "social-proof",
      category: "marketing",
      title: "Social Proof",
      description: "Trust indicators with stats",
      component: <SocialProof />,
      code: sectionsCodeSnippets["social-proof"],
    },
    {
      id: "comparison-table",
      category: "marketing",
      title: "Comparison Table",
      description: "Feature comparison against competitors",
      component: (
        <ComparisonTable
          title="See How We Compare"
          ourProduct="Our Product"
          competitors={["Competitor A", "Competitor B"]}
          features={[
            { name: "Unlimited components", us: true, competitor1: false, competitor2: true },
            { name: "Dark mode support", us: true, competitor1: true, competitor2: false },
            { name: "Priority support", us: true, competitor1: false, competitor2: false },
            { name: "Custom themes", us: true, competitor1: true, competitor2: true },
            { name: "Lifetime updates", us: true, competitor1: false, competitor2: false },
          ]}
        />
      ),
      code: sectionsCodeSnippets["comparison-table"],
    },
    {
      id: "team-grid",
      category: "marketing",
      title: "Team Grid",
      description: "Team member showcase grid",
      component: (
        <TeamGrid
          title="Meet Our Team"
          description="The talented people behind our success"
          members={[
            { name: "Alex Morgan", role: "Founder & CEO", bio: "10+ years in product design", initials: "AM" },
            { name: "Sam Rivera", role: "CTO", bio: "Former Google engineer", initials: "SR" },
            { name: "Jordan Lee", role: "Head of Design", bio: "Award-winning designer", initials: "JL" },
            { name: "Taylor Kim", role: "Lead Developer", bio: "Full-stack expert", initials: "TK" },
            { name: "Casey Brown", role: "Product Manager", bio: "Ex-Amazon PM", initials: "CB" },
            { name: "Morgan Chen", role: "Marketing Lead", bio: "Growth specialist", initials: "MC" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["team-grid"],
    },
    {
      id: "process-steps",
      category: "marketing",
      title: "Process Steps",
      description: "Step-by-step process visualization",
      component: (
        <ProcessSteps
          title="How It Works"
          description="Get started in three simple steps"
          steps={[
            {
              icon: Target,
              title: "Choose Your Plan",
              description: "Select the perfect plan for your needs",
            },
            {
              icon: Rocket,
              title: "Install & Setup",
              description: "Quick installation with our CLI tool",
            },
            {
              icon: Sparkles,
              title: "Start Building",
              description: "Use pre-built components in your project",
            },
          ]}
        />
      ),
      code: sectionsCodeSnippets["process-steps"],
    },
    {
      id: "stats-section",
      category: "marketing",
      title: "Stats Section",
      description: "Big numbers to showcase achievements",
      component: (
        <StatsSection
          title="Our Impact in Numbers"
          stats={[
            { icon: Users, value: "50K+", label: "Happy Users", description: "Across 120 countries" },
            { icon: Rocket, value: "100K+", label: "Projects Built", description: "And counting" },
            { icon: Award, value: "15+", label: "Awards Won", description: "Industry recognition" },
            { icon: Clock, value: "24/7", label: "Support", description: "Always here to help" },
          ]}
        />
      ),
      code: sectionsCodeSnippets["stats-section"],
    },
    {
      id: "contact-form",
      category: "marketing",
      title: "Contact Form",
      description: "Contact form with info display",
      component: (
        <ContactForm
          contactInfo={{
            email: "hello@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, San Francisco, CA 94102",
          }}
        />
      ),
      code: sectionsCodeSnippets["contact-form"],
    },
    {
      id: "trust-badges",
      category: "marketing",
      title: "Trust Badges",
      description: "Trust indicators and value props",
      component: <TrustBadges />,
      code: sectionsCodeSnippets["trust-badges"],
    },
  ]
}
