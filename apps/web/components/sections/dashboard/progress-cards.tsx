import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Progress } from "@workspace/ui/components/progress"
import { Badge } from "@workspace/ui/components/badge"

interface ProgressCard {
  title: string
  progress: number
  status: "on-track" | "at-risk" | "delayed"
  description?: string
  team?: string[]
}

interface ProgressCardsProps {
  title?: string
  projects: ProgressCard[]
}

export function ProgressCards({ title = "Projects", projects }: ProgressCardsProps) {
  const statusConfig = {
    "on-track": { label: "On Track", variant: "default" as const },
    "at-risk": { label: "At Risk", variant: "secondary" as const },
    delayed: { label: "Delayed", variant: "destructive" as const },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{project.title}</p>
                  {project.description && <p className="text-xs text-muted-foreground">{project.description}</p>}
                </div>
                <Badge variant={statusConfig[project.status].variant}>{statusConfig[project.status].label}</Badge>
              </div>
              <Progress value={project.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{project.progress}% complete</span>
                {project.team && project.team.length > 0 && (
                  <div className="flex -space-x-2">
                    {project.team.map((member, memberIdx) => (
                      <div
                        key={memberIdx}
                        className="h-6 w-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-medium"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
