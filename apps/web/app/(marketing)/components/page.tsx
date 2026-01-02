import { ComponentsShowcase } from "@/components/showcase/components-showcase"

export default function ComponentsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Component Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of UI components. Each component is fully customizable and built with
            accessibility in mind.
          </p>
        </div>
        <ComponentsShowcase />
      </div>
    </div>
  )
}
