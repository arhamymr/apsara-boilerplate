import { Badge } from "@workspace/ui/components/badge"

interface ComponentHeaderProps {
  title: string
  category: string
  description: string
}

export function ComponentHeader({ title, category, description }: ComponentHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <Badge variant="secondary">{category}</Badge>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
    </div>
  )
}
