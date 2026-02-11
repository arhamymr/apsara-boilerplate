import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

interface ActivityItem {
  id: number;
  type: string;
  description: string;
  count: number;
  time: string;
}

interface ActivityOverviewProps {
  recentActivity: ActivityItem[];
}

export function ActivityOverview({ recentActivity }: ActivityOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Recent system activities and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="secondary">{activity.count}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
