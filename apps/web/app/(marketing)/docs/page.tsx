import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Button } from "@workspace/ui/components/button"
import {
  BookOpen,
  Download,
  Folder,
  Layers,
  Palette,
  Rocket,
  Terminal,
  Code2,
  Component,
  FileCode,
  Settings,
  Zap,
  RefreshCw,
  Plus,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export const metadata = {
  title: "Documentation - UIKit Template",
  description: "Complete guide to using the UIKit template for your next project",
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <DocsSidebar />

      <div className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4" variant="secondary">
                <BookOpen className="mr-1 h-3 w-3" />
                Documentation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get Started with UIKit</h1>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Everything you need to build modern web applications with our comprehensive component library and
                templates
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link href="#quick-start">Quick Start</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/components">Browse Components</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Quick Start</h2>
                <p className="text-muted-foreground">Get up and running in minutes</p>
              </div>

              <Tabs defaultValue="install" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="install">Installation</TabsTrigger>
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>

                <TabsContent value="install" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Download Template
                      </CardTitle>
                      <CardDescription>Get the template files and install dependencies</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Step 1: Download the template</p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                          # Click the three dots in the top right and select "Download ZIP"
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Step 2: Extract and install</p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
                          <div>cd uikit-template</div>
                          <div>npm install</div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Step 3: Run development server</p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">npm run dev</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="setup" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configuration
                      </CardTitle>
                      <CardDescription>Customize the template for your project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Update branding</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Edit the logo and site name in{" "}
                          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                            components/navigation/main-nav.tsx
                          </code>
                        </p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                          {`<span className="text-lg font-semibold">YourBrand</span>`}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Configure theme colors</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Modify CSS variables in{" "}
                          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">app/globals.css</code>
                        </p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                          {`--primary: 200 100% 50%;
--secondary: 200 20% 92%;`}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Update metadata</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Change site metadata in{" "}
                          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">app/layout.tsx</code>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="h-5 w-5" />
                        Using Components
                      </CardTitle>
                      <CardDescription>Import and use components in your pages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Import a component</p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                          {`import { Button } from "@workspace/ui/components/button"`}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Use in your JSX</p>
                        <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                          {`<Button variant="default">Click me</Button>`}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Browse all available components and their props in the{" "}
                          <Link href="/components" className="text-primary hover:underline">
                            Components page
                          </Link>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section id="project-structure" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Project Structure</h2>
                <p className="text-muted-foreground">Understanding the template organization</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Folder className="h-5 w-5 text-primary" />
                      app/
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">(marketing)/</span>
                      <span className="text-muted-foreground">Landing, blog, about pages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">(auth)/</span>
                      <span className="text-muted-foreground">Login, register pages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">dashboard/</span>
                      <span className="text-muted-foreground">Admin dashboard routes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">layout.tsx</span>
                      <span className="text-muted-foreground">Root layout & providers</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Component className="h-5 w-5 text-primary" />
                      components/
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">ui/</span>
                      <span className="text-muted-foreground">shadcn/ui components</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">sections/</span>
                      <span className="text-muted-foreground">Reusable page sections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">landing/</span>
                      <span className="text-muted-foreground">Landing page components</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">auth/</span>
                      <span className="text-muted-foreground">Authentication forms</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileCode className="h-5 w-5 text-primary" />
                      lib/
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">utils.ts</span>
                      <span className="text-muted-foreground">Utility functions (cn, etc.)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">blog-data.tsx</span>
                      <span className="text-muted-foreground">Blog posts content</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">showcase-*.tsx</span>
                      <span className="text-muted-foreground">Component showcase data</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Layers className="h-5 w-5 text-primary" />
                      Other Directories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">public/</span>
                      <span className="text-muted-foreground">Static assets & images</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">hooks/</span>
                      <span className="text-muted-foreground">Custom React hooks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground font-mono">styles/</span>
                      <span className="text-muted-foreground">Global CSS & theme</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Guide */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Key Features</h2>
                <p className="text-muted-foreground">Explore what's included in the template</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Component className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>40+ UI Components</CardTitle>
                    </div>
                    <CardDescription>
                      Complete set of shadcn/ui components including buttons, forms, cards, modals, and more
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/components">View Components</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Layers className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>24+ Page Sections</CardTitle>
                    </div>
                    <CardDescription>
                      Pre-built sections for landing pages, dashboards, and marketing content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/components">View Sections</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Dark Mode Support</CardTitle>
                    </div>
                    <CardDescription>
                      Built-in theme switching with seamless dark and light mode transitions
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>React Query Integration</CardTitle>
                    </div>
                    <CardDescription>
                      Pre-configured data fetching with caching, mutations, and pagination examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <a href="#examples">View Examples</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Terminal className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>TypeScript Ready</CardTitle>
                    </div>
                    <CardDescription>
                      Fully typed components with IntelliSense support for better developer experience
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Rocket className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Production Ready</CardTitle>
                    </div>
                    <CardDescription>
                      Optimized build, SEO-friendly structure, and deployment-ready configuration
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* React Query Examples Section */}
        <section id="examples" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">React Query Examples</h2>
                <p className="text-muted-foreground">
                  Learn how to use TanStack Query for data fetching, caching, and state management
                </p>
              </div>

              <div className="space-y-6">
                {/* Basic Query Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-primary" />
                      Basic Query
                    </CardTitle>
                    <CardDescription>Simple data fetching with loading states and error handling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Import and setup</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"import { useQuery } from '@tanstack/react-query'"}</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Usage example</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"const { data, isLoading, error } = useQuery({"}</div>
                        <div className="pl-4">{"queryKey: ['users'],"}</div>
                        <div className="pl-4">{"queryFn: fetchUsers,"}</div>
                        <div>{"})"}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfect for fetching and caching data with automatic refetching and background updates.
                    </p>
                  </CardContent>
                </Card>

                {/* Parameterized Query */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Parameterized Query
                    </CardTitle>
                    <CardDescription>Dynamic queries that update based on parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Usage example</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"const { data } = useQuery({"}</div>
                        <div className="pl-4">{"queryKey: ['user', userId],"}</div>
                        <div className="pl-4">{"queryFn: () => fetchUser(userId),"}</div>
                        <div className="pl-4">{"enabled: !!userId,"}</div>
                        <div>{"})"}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use parameters in your queryKey to create dynamic queries that automatically refetch when
                      dependencies change.
                    </p>
                  </CardContent>
                </Card>

                {/* Mutations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-primary" />
                      Mutations
                    </CardTitle>
                    <CardDescription>Create, update, or delete data with automatic cache updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Usage example</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"const mutation = useMutation({"}</div>
                        <div className="pl-4">{"mutationFn: createUser,"}</div>
                        <div className="pl-4">{"onSuccess: () => {"}</div>
                        <div className="pl-8">{"queryClient.invalidateQueries({ queryKey: ['users'] })"}</div>
                        <div className="pl-4">{"},"}</div>
                        <div>{"})"}</div>
                        <div className="mt-2">{"mutation.mutate(newUserData)"}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mutations handle data modifications and can automatically update your cache when successful.
                    </p>
                  </CardContent>
                </Card>

                {/* Infinite Query */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 text-primary" />
                      Infinite Queries
                    </CardTitle>
                    <CardDescription>Implement pagination and infinite scrolling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Usage example</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({"}</div>
                        <div className="pl-4">{"queryKey: ['posts'],"}</div>
                        <div className="pl-4">{"queryFn: fetchPosts,"}</div>
                        <div className="pl-4">{"getNextPageParam: (lastPage) => lastPage.nextPage,"}</div>
                        <div className="pl-4">{"initialPageParam: 1,"}</div>
                        <div>{"})"}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfect for implementing "Load More" buttons or infinite scroll patterns with built-in page
                      management.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section id="authentication" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Badge className="mb-2" variant="secondary">
                  New
                </Badge>
                <h2 className="text-3xl font-bold mb-2">Authentication with Better Auth</h2>
                <p className="text-muted-foreground">
                  Complete authentication system with email/password login, session management, and protected routes
                </p>
              </div>

              <div className="space-y-6">
                {/* Overview Card */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                    <CardDescription>Pre-configured authentication features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Email/Password authentication</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Session management</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Protected routes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>OAuth providers (GitHub, Google)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>TypeScript support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>React hooks</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Setup */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Quick Setup
                    </CardTitle>
                    <CardDescription>Get authentication working in 3 steps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Step 1: Configure environment variables</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>DATABASE_URL="postgresql://user:password@localhost:5432/mydb"</div>
                        <div>NEXT_PUBLIC_APP_URL="http://localhost:3000"</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Step 2: Initialize database</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">npx prisma db push</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Step 3: Use auth pages</p>
                      <p className="text-sm text-muted-foreground">
                        Visit <code className="bg-muted px-1.5 py-0.5 rounded text-xs">/login</code> and{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">/register</code> - they're ready to
                        use!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Client Session Check */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Check User Session
                    </CardTitle>
                    <CardDescription>Display content based on authentication status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Using the useSession hook</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{'import { authClient } from "@/lib/auth-client"'}</div>
                        <div className="mt-2">{"export default function MyComponent() {"}</div>
                        <div className="pl-4">{"const { data: session, isPending } = authClient.useSession()"}</div>
                        <div className="pl-4 mt-2">{"if (isPending) return <div>Loading...</div>"}</div>
                        <div className="pl-4">{"if (!session) return <div>Not authenticated</div>"}</div>
                        <div className="pl-4 mt-2">{"return <div>Welcome, {session.user.name}!</div>"}</div>
                        <div>{"}"}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The session object contains user information like email, name, and ID.
                    </p>
                  </CardContent>
                </Card>

                {/* Sign In/Up */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-primary" />
                      Authentication Methods
                    </CardTitle>
                    <CardDescription>Sign in, sign up, and sign out users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Sign In</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"await authClient.signIn.email({"}</div>
                        <div className="pl-4">{'email: "user@example.com",'}</div>
                        <div className="pl-4">{'password: "password123",'}</div>
                        <div>{"})"}</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Sign Up</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"await authClient.signUp.email({"}</div>
                        <div className="pl-4">{'email: "user@example.com",'}</div>
                        <div className="pl-4">{'password: "password123",'}</div>
                        <div className="pl-4">{'name: "John Doe",'}</div>
                        <div>{"})"}</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Sign Out</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">await authClient.signOut()</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protected Routes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Protected Routes
                    </CardTitle>
                    <CardDescription>Automatic route protection with middleware</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm mb-2">
                        Routes are automatically protected in{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">proxy.ts</code>:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">/dashboard/*</code> - Requires
                          authentication
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">/login, /register</code> - Redirects
                          if authenticated
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Add more protected routes</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>{"export const config = {"}</div>
                        <div className="pl-4">{'matcher: ["/dashboard/:path*", "/admin/:path*"],'}</div>
                        <div>{"}"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* OAuth Providers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      OAuth Providers
                    </CardTitle>
                    <CardDescription>Enable social login with GitHub, Google, and more</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Add provider credentials to .env</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
                        <div>GITHUB_CLIENT_ID="your_github_client_id"</div>
                        <div>GITHUB_CLIENT_SECRET="your_github_client_secret"</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      OAuth providers are pre-configured in{" "}
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">lib/auth.ts</code>. Just add your
                      credentials to enable them.
                    </p>
                  </CardContent>
                </Card>

                {/* Security Best Practices */}
                <Card className="border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      Security Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>Always use HTTPS in production</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>Set strong password requirements</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>Enable email verification for production</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>Use environment variables for sensitive data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                        <span>Implement rate limiting for login attempts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Learn More */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learn More</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://better-auth.com/docs" target="_blank" rel="noopener noreferrer">
                          Better Auth Docs
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/login">Try Login Page</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Best Practices</h2>
                <p className="text-muted-foreground">Tips for working with the template</p>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Component Customization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      • Copy components from{" "}
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">components/ui</code> to customize them
                    </p>
                    <p>
                      • Use the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">cn()</code> utility to merge
                      Tailwind classes
                    </p>
                    <p>• Leverage component variants for different styles</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Theme Customization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      • Modify CSS variables in{" "}
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">globals.css</code> for consistent theming
                    </p>
                    <p>• Use semantic color names (primary, secondary) instead of specific colors</p>
                    <p>• Test both light and dark modes when customizing colors</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Use Next.js Image component for optimized images</p>
                    <p>• Implement React Query for efficient data fetching</p>
                    <p>• Lazy load components that aren't immediately visible</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Code Organization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Keep pages simple - move complex logic to separate components</p>
                    <p>• Create custom hooks for reusable logic</p>
                    <p>• Use TypeScript interfaces for component props</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section id="deployment" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Deployment</h2>
                <p className="text-muted-foreground">Deploy your application to production</p>
              </div>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Deploy to Vercel</CardTitle>
                  <CardDescription>Recommended hosting platform for Next.js applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        1
                      </span>
                      <div>
                        <p className="font-medium">Push to GitHub</p>
                        <p className="text-muted-foreground">Create a repository and push your code</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        2
                      </span>
                      <div>
                        <p className="font-medium">Import to Vercel</p>
                        <p className="text-muted-foreground">Connect your GitHub repository to Vercel</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        3
                      </span>
                      <div>
                        <p className="font-medium">Configure & Deploy</p>
                        <p className="text-muted-foreground">Vercel auto-detects Next.js and handles the build</p>
                      </div>
                    </li>
                  </ol>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                        Deploy to Vercel
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://nextjs.org/docs/deployment" target="_blank" rel="noopener noreferrer">
                        View Deployment Docs
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
              <p className="text-muted-foreground mb-8">
                Start creating amazing applications with our comprehensive template
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link href="/components">Browse Components</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sections">View Sections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
