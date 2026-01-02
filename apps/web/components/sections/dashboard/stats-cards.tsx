import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change?: number
  icon: LucideIcon
  description?: string
}

interface StatsCardsProps {
  stats: StatCard[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change !== undefined && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.change > 0 ? (
                  <ArrowUp className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>{Math.abs(stat.change)}%</span>
                <span className="ml-1">{stat.description || "from last month"}</span>
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
