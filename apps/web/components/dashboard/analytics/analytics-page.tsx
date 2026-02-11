"use client";

import * as React from "react";
import { RequireAttribute } from "@/lib/auth/require-attribute";
import { ATTRIBUTE_TYPES } from "@/lib/auth/attribute-types";
import { BarChart3, TrendingUp, Users, Download, Calendar } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { MetricsGrid } from "./metrics-grid";
import { ActivityOverview } from "./activity-overview";
import { UserBehaviorCard } from "./user-behavior-card";

const analyticsData = {
  totalUsers: {
    title: "Total Users",
    value: "1,234",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
  },
  activeProjects: {
    title: "Active Projects",
    value: "42",
    change: "+8.2%",
    trend: "up" as const,
    icon: BarChart3,
  },
  engagementRate: {
    title: "Engagement Rate",
    value: "68.4%",
    change: "+5.1%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  conversionRate: {
    title: "Conversion Rate",
    value: "23.8%",
    change: "-2.3%",
    trend: "down" as const,
    icon: BarChart3,
  },
};

const recentActivity = [
  {
    id: 1,
    type: "user_registered",
    description: "New user registration",
    count: 15,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "project_created",
    description: "New projects created",
    count: 8,
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "feature_used",
    description: "Analytics feature accessed",
    count: 234,
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "system_event",
    description: "System maintenance completed",
    count: 1,
    time: "1 day ago",
  },
];

export function AnalyticsPage() {
  return (
    <RequireAttribute attribute={ATTRIBUTE_TYPES.VIEW_ANALYTICS}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Monitor your application performance and usage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <MetricsGrid analyticsData={analyticsData} />

        <div className="grid gap-4 md:grid-cols-2">
          <ActivityOverview recentActivity={recentActivity} />

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 opacity-20" />
                <span className="ml-4">Chart visualization coming soon</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <UserBehaviorCard />
      </div>
    </RequireAttribute>
  );
}
