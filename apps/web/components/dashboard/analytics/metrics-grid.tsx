import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { TrendingUp } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

interface AnalyticsData {
  [key: string]: Metric;
}

interface MetricsGridProps {
  analyticsData: AnalyticsData;
}

export function MetricsGrid({ analyticsData }: MetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(analyticsData).map(([key, data]) => {
        const Icon = data.icon;
        return (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {data.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp
                  className={`h-3 w-3 mr-1 ${data.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                />
                <span
                  className={
                    data.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {data.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
