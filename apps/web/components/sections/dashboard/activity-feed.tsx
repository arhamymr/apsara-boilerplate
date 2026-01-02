import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Activity {
  icon: LucideIcon
  title: string
  description: string
  timestamp: string
  type?: "success" | "warning" | "error" | "info"
}

interface ActivityFeedProps {
  title?: string
  activities: Activity[]
}

export function ActivityFeed({ title = "Recent Activity", activities }: ActivityFeedProps) {
  const typeColors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  activity.type ? typeColors[activity.type] : "bg-primary"
                } text-white flex-shrink-0`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
