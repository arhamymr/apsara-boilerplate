import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";

interface SystemInfoCardProps {
  systemVersion?: string;
  databaseStatus?: string;
  lastBackup?: string;
  systemUptime?: string;
}

export function SystemInfoCard({
  systemVersion = "1.0.0",
  databaseStatus = "Connected",
  lastBackup = "2 hours ago",
  systemUptime = "7 days, 14 hours",
}: SystemInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Information</CardTitle>
        <CardDescription>Current system status and information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">System Version</div>
            <div className="text-sm text-muted-foreground">{systemVersion}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Database Status</div>
            <Badge variant="default">{databaseStatus}</Badge>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Last Backup</div>
            <div className="text-sm text-muted-foreground">{lastBackup}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">System Uptime</div>
            <div className="text-sm text-muted-foreground">{systemUptime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
