import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { ArrowUp, ArrowDown, Users, Layers, Eye, Clock, ArrowRight } from "lucide-react"

const stats = [
  { title: "Total Users", value: "12,543", change: "+12.5%", trend: "up", icon: Users },
  { title: "Components Used", value: "1,234", change: "+8.2%", trend: "up", icon: Layers },
  { title: "Page Views", value: "89.2K", change: "-2.4%", trend: "down", icon: Eye },
  { title: "Avg. Session", value: "4m 32s", change: "+18.7%", trend: "up", icon: Clock },
]

const topComponents = [
  { name: "Button", usage: 2345, growth: 12.5, category: "Forms" },
  { name: "Card", usage: 1890, growth: 8.3, category: "Layout" },
  { name: "Dialog", usage: 1234, growth: 15.2, category: "Overlay" },
  { name: "Table", usage: 987, growth: -2.1, category: "Data" },
  { name: "Input", usage: 876, growth: 5.7, category: "Forms" },
]

const recentActivity = [
  { user: "Alice Johnson", action: "Created new project", time: "2 min ago", avatar: "A" },
  { user: "Bob Smith", action: "Updated dashboard", time: "15 min ago", avatar: "B" },
  { user: "Carol White", action: "Deployed to production", time: "1 hour ago", avatar: "C" },
  { user: "David Brown", action: "Added team member", time: "3 hours ago", avatar: "D" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your project metrics and team activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-accent" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-accent" : "text-destructive"}>{stat.change}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Component Usage Table */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Component Usage</CardTitle>
              <CardDescription>Most used components this month</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Usage</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topComponents.map((component) => (
                  <TableRow key={component.name}>
                    <TableCell className="font-medium">{component.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{component.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{component.usage.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={component.growth >= 0 ? "text-accent" : "text-destructive"}>
                        {component.growth >= 0 ? "+" : ""}
                        {component.growth}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{activity.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.user}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Project Alpha", desc: "Dashboard redesign", progress: 75, members: 3 },
          { name: "Project Beta", desc: "Component library v2", progress: 45, members: 5 },
          { name: "Project Gamma", desc: "Mobile app development", progress: 90, members: 2 },
        ].map((project) => (
          <Card key={project.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{project.name}</CardTitle>
              <CardDescription>{project.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex -space-x-2">
                    {Array.from({ length: project.members }).map((_, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">U{i + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{project.members} team members</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
