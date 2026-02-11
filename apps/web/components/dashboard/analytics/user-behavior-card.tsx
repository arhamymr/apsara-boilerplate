import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export function UserBehaviorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Behavior</CardTitle>
        <CardDescription>
          How users interact with your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Most Used Features</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dashboard</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Analytics</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Projects</span>
                <span className="font-medium">45%</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Peak Usage Times</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>9:00 AM - 12:00 PM</span>
                <span className="font-medium">High</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>2:00 PM - 5:00 PM</span>
                <span className="font-medium">Medium</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>6:00 PM - 9:00 PM</span>
                <span className="font-medium">Low</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Device Usage</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Desktop</span>
                <span className="font-medium">62%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mobile</span>
                <span className="font-medium">31%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tablet</span>
                <span className="font-medium">7%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
